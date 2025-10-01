'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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



export const initialOrderFormData = {
  userId: "", // optional (leave empty for guest)

  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
    apartment: "",
  },

  shippingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
    apartment: "",
  },

  orderItems: [
    {
      productId: "",
      name: "",
      image: "",
      quantity: 1,
      price: 0,
      variant: {},
    },
  ],

  paymentMethod: "", // "credit_card", "paypal", "cash_on_delivery", or "bank_transfer"
  paymentStatus: "pending",
  orderStatus: "pending",

  taxAmount: 0,
  shippingFee: 0,
  discount: 0,
  totalAmount: 0,

  trackingInfo: {
    carrier: "",
    trackingNumber: "",
    estimatedDelivery: "",
  },

  notes: "",
};

const Checkout = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState(initialOrderFormData);
  const [loading, setLoading] = useState(true);
  const { store } = useSelector((state) => state?.store);
  const { cartData, initialLoading } = useSelector((state) => state?.cartData);
  const { discounts } = useSelector((state) => state?.storeConfiguration?.storeConfiguration);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [couponDiscount, setCouponDiscount] = useState(null);




  useEffect(() => {
    if (!initialLoading) {
      if (!cartData || cartData.length === 0) {
        // router.push(`${getBasePath()}/cart`);
      }
      setLoading(false);
    }
  }, [initialLoading, cartData, router]);


  const totalProductCost = useMemo(() => {
    return cartData?.reduce((total, product) => (
      total + (product.price * product.quantity)
    ), 0) || 0;
  }, [cartData]);

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

    // if (!placeOrderValidate(orderData, setErrors)) {
    //   return;
    // }

    // const {
    //   email,
    //   country,
    //   firstName,
    //   lastName,
    //   address,
    //   appartment,
    //   city,
    //   postalCode,
    //   phone,
    // } = formData;
    // const extractedData = cartItem.map(({ name, quantity, selectedSize, discountedPrice, _id, images }) => ({
    //   name,
    //   selectedSize,
    //   _id,
    //   image: images[0],
    //   quantity,
    //   totalOfProduct: discountedPrice * quantity,
    // }));

    // const data = {
    //   from: siteName,
    //   to: SiteLogo?.image,
    //   customerInfo: {
    //     email,
    //     firstName,
    //     lastName,
    //     phone,
    //     method: 'COD',
    //     city,
    //     country,
    //     address,
    //     postalCode,
    //     appartment,
    //   },
    //   orderData: extractedData,
    //   orderInfo: {
    //     tax: tax,
    //     shipping: shipping,
    //     discount: discount,
    //     total: total,
    //   },
    // };

    try {

      setLoading(true)
      const paymentMethod = await getHashedPaymentCredential(store?._id, selectedMethod)

      if (paymentMethod?.method === "jazzcash") {
        const { merchantId, pp_Password, integritySalt } = paymentMethod?.credentials
        jazzCashPayment({ merchantId, password: pp_Password, salt: integritySalt, amount: 1000, returnUrl: `https://dev.xperiode.com/store/683e8be81cd7939b6e016b92/payment/responce`, phone: '0321-8969332', isTestAccount: true });
      } else if (paymentMethod?.method === "alfalah") {
        const { merchantId, pp_Password, integritySalt } = paymentMethod?.credentials
        alfalahPayment({
          merchantId: "TESTMERCHANT123",
          storeId: "TESTSTORE001",
          merchantHash: "ABC123HASHCODE",
          merchantUsername: "testuser",
          merchantPassword: "testpass",
          secretKey: "TESTSECRETKEY123",
          amount: "1000.00",
          returnUrl: "https://dev.xperiode.com/store/683e8be81cd7939b6e016b92/payment/responce",
          isTest: true,
          customFields: {
            HS_IsRedirectionRequest: "0"
          }
        });
      }



      // dispatch(deleteCartData({ siteName }))
      // localStorage.removeItem('cartId')
      // setFormData(initialFormData);
      // setErrors({});
      setLoading(false)
      toast.success("Your order has confirmed and will deliverd in 2 to 3 working days")
    } catch (err) {
      setLoading(false)
      toast.error("Error sending email:", err)
    }
  };

  return (
    <div className='grid grid-cols-2 w-full flex-col-reverse md:flex-row'>

      <div className={`bg-[var(--tmp-pri)] h-screen overflow-auto direction-rtl scroll-left customScroll w-full px-5 py-3 flex justify-end`}>
        <div className='max-w-[500px] w-full'>
          <CheckoutHeader />
          <PaymentForm errors={errors} selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
        </div>
      </div>

      <div className="h-screen bg-[var(--tmp-acc)] w-full px-8 py-2 flex justify-start sticky top-0">
        <div className="max-w-[500px] w-full flex flex-col h-full">
          {/* <h2 className="text-[24px] font-semibold mb-1 text-[var(--tmp-txt)]">Reciept</h2> */}

          <ProductsReciept products={cartData} />

          <PaymentSummary className="bottom-0"
            totalProductCost={totalProductCost}
            globalDiscount={globalDiscount}
            couponDiscount={couponDiscount}
            subTotal={subTotalAfterDiscount}
            shipping={shippingCost}
            tax={tax}
            total={total}
          >
            <ApplyCoupon
              email={"abc@gmail.com"}
              totalProductCost={
                totalProductCost - globalDiscount?.discountAmount || 0
              }
              setCouponDiscount={setCouponDiscount}
            />

            <Button
              label="Proceed To Payment"
              loading={loading}
              action={handleSubmit}
              size="small"
              variant="black"
              icon={<FaArrowRightLong />}
              iconPosition="right"
              iconOnHover={true}
              className="bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] mt-4 rounded-md !w-full !py-[12px]"
            />

          </PaymentSummary>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
