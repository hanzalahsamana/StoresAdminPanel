'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import PaymentSummary from '@/components/UI/PaymentSummary';
import PaymentForm from '@/components/Forms/PaymentForm';
import ApplyCoupon from '@/components/Forms/ApplyCoupon';
import Button from '@/components/Actions/Button';
import { FaArrowRightLong } from 'react-icons/fa6';
import { jazzCashPayment } from '@/Utils/PaymentMethodUtils/JazzcashPayment';
import { getHashedPaymentCredential } from '@/APIs/StoreConfigurations/paymentMethodApi';
import { toast } from 'react-toastify';
import ProductsReciept from '@/components/UI/productsRecipt';
import CheckoutHeader from '@/components/Layout/CheckoutHeader';
import { getValidGlobalDiscount } from '@/Helpers/CheckoutHelpers';
import { alfalahPayment } from '@/Utils/PaymentMethodUtils/AlfalahPayment';
import CustomCard from '@/components/Cards/CustomCard';
import { verifyCheckoutSession } from '@/APIs/Checkout/Checkout';
import CheckoutLoader from '@/components/Loader/CheckoutLoader';
import AnimationWrapper from '@/components/Layout/AnimationWrapper';
import { getBasePath } from '@/Utils/GetBasePath';
import { placeOrderValidate } from '@/Utils/FormsValidator';

export const initialOrderFormData = {
    userId: '', // optional (leave empty for guest)

    customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        postalCode: '',
        address: '',
        apartment: '',
    },

    shippingAddress: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        postalCode: '',
        address: '',
        apartment: '',
    },

    orderItems: [
        {
            productId: '',
            name: '',
            image: '',
            quantity: 1,
            price: 0,
            variant: {},
        },
    ],

    paymentMethod: '', // "credit_card", "paypal", "cash_on_delivery", or "bank_transfer"
    paymentStatus: 'pending',
    orderStatus: 'pending',

    taxAmount: 0,
    shippingFee: 0,
    discount: 0,
    totalAmount: 0,

    trackingInfo: {
        carrier: '',
        trackingNumber: '',
        estimatedDelivery: '',
    },

    notes: '',
};

const Checkout = ({ params }) => {
    const router = useRouter();
    const [checkoutVerifyLoading, setCheckoutVeridyLoading] = useState(true);
    const { store } = useSelector((state) => state?.store);
    const { discounts } = useSelector((state) => state?.storeConfiguration?.storeConfiguration);
    const [errors, setErrors] = useState({});
    const [couponDiscount, setCouponDiscount] = useState(null);
    const checkoutToken = params?.checkout_token;
    const [verifiedProducts, setVerifiedProducts] = useState([]);
    const [formData, setFormData] = useState({});
    const { paymentMethods } = useSelector((state) => state?.storeConfiguration?.storeConfiguration);


    useEffect(() => {
        setFormData({
            ...formData,
            paymentInfo: paymentMethods?.[0],
        })
    }, [paymentMethods]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const fetchCheckoutData = async () => {
        if (!checkoutToken || !store?._id) return;
        try {
            setCheckoutVeridyLoading(true);
            const response = await verifyCheckoutSession(store._id, checkoutToken);
            setVerifiedProducts(response.cartItems);
            setCheckoutVeridyLoading(false);
        } catch (error) {
            router.push(`${getBasePath()}/`);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCheckoutData();
    }, [checkoutToken, store?._id]);
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const totalProductCost = useMemo(() => {
        return verifiedProducts?.reduce((total, product) => total + product.price * product.quantity, 0) || 0;
    }, [verifiedProducts]);

    const globalDiscount = useMemo(() => {
        return getValidGlobalDiscount(discounts, totalProductCost);
    }, [discounts, totalProductCost]);

    const totalDiscountAmount = useMemo(() => {
        return (globalDiscount?.discountAmount || 0) + (couponDiscount?.discountAmount || 0);
    }, [globalDiscount, couponDiscount]);

    const subTotalAfterDiscount = useMemo(() => {
        return Math.max(totalProductCost - totalDiscountAmount, 0);
    }, [totalProductCost, totalDiscountAmount]);

    const shippingCost = 200;
    const tax = 0;

    const total = useMemo(() => {
        return subTotalAfterDiscount + shippingCost + tax;
    }, [subTotalAfterDiscount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!placeOrderValidate(formData, setErrors)) {
            return;
        }
        // const data = {
        //     from: siteName,
        //     to: SiteLogo?.image,
        //     customerInfo: {
        //         email,
        //         firstName,
        //         lastName,
        //         phone,
        //         method: 'COD',
        //         city,
        //         country,
        //         address,
        //         postalCode,
        //         appartment,
        //     },
        //     orderData: extractedData,
        //     orderInfo: {
        //         tax: tax,
        //         shipping: shipping,
        //         discount: discount,
        //         total: total,
        //     },
        // };

        try {
            setCheckoutVeridyLoading(true);

            // dispatch(deleteCartData({ siteName }))
            // localStorage.removeItem('cartId')
            // setFormData(initialFormData);
            // setErrors({});
            setCheckoutVeridyLoading(false);
            toast.success('Your order has confirmed and will deliverd in 2 to 3 working days');
        } catch (err) {
            setCheckoutVeridyLoading(false);
            toast.error('Error sending email:', err);
        }
    };

    if (checkoutVerifyLoading) {
        return <CheckoutLoader />
    }


    return (
        <div className="grid grid-cols-2 w-full flex-col-reverse md:flex-row">
            <div className={`bg-[var(--tmp-pri)] h-screen overflow-auto direction-rtl scroll-left customScroll w-full px-5 py-3 flex justify-end`}>
                <div className="max-w-[500px] w-full">
                    <CheckoutHeader />
                    <AnimationWrapper>
                        <PaymentForm errors={errors} formData={formData} handleChange={handleChange} />
                    </AnimationWrapper>
                </div>
            </div>

            <div className="h-screen bg-[var(--tmp-acc)] w-full px-8 py-2 flex justify-start sticky top-0">
                <div className="max-w-[500px] w-full flex flex-col h-full">
                    <AnimationWrapper>
                        <ProductsReciept products={verifiedProducts} />
                    </AnimationWrapper>

                    <AnimationWrapper>
                        <PaymentSummary
                            className="bottom-0"
                            totalProductCost={totalProductCost}
                            globalDiscount={globalDiscount}
                            couponDiscount={couponDiscount}
                            subTotal={subTotalAfterDiscount}
                            shipping={shippingCost}
                            tax={tax}
                            total={total}
                        >
                            <ApplyCoupon email={'abc@gmail.com'} totalProductCost={(Number(totalProductCost) || 0) - (Number(globalDiscount?.discountAmount) || 0)} setCouponDiscount={setCouponDiscount} />
                            <Button
                                label="Proceed To Payment"
                                loading={checkoutVerifyLoading}
                                action={handleSubmit}
                                size="small"
                                variant="black"
                                icon={<FaArrowRightLong />}
                                iconPosition="right"
                                iconOnHover={true}
                                className="bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] mt-4 rounded-md !w-full !py-[12px]"
                            />
                        </PaymentSummary>
                    </AnimationWrapper>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
