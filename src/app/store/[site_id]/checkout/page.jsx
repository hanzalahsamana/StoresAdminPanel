'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { getBasePath } from '@/Utils/GetBasePath';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getValidDiscountAmount, getValidGlobalDiscount } from '@/Utils/CheckoutHelpers';
import PaymentSummary from '@/components/UI/PaymentSummary';
import ProductsRecipt from '@/components/UI/productsRecipt';
import PaymentForm from '@/components/Forms/PaymentForm';
import ApplyCoupon from '@/components/Forms/ApplyCoupon';
import Button from '@/components/Actions/Button';
import { FaArrowRightLong } from 'react-icons/fa6';
import Link from 'next/link';
import { jazzCashPayment } from '@/Utils/PaymentMethodUtils/JazzcashPayment';
import { getHashedPaymentCredential } from '@/APIs/StoreConfigurations/paymentMethodApi';
import { toast } from 'react-toastify';
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { totalCalculate } from '@/Utils/TotalCalculator';
import { SlHandbag } from 'react-icons/sl';
import ProductsReciept from '@/components/UI/productsRecipt';

const Checkout = () => {
  const router = useRouter();
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(null);
  const { store } = useSelector((state) => state?.store);
  const { cartData, initialLoading } = useSelector((state) => state?.cartData);
  const { discounts } = useSelector((state) => state?.storeDetail?.storeDetail || {});
  const [selectedMethod, setSelectedMethod] = useState("");
  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));



  const totalProductCost = useMemo(() => {
    return cartData?.reduce((total, product) => (
      total + (product.price * product.quantity)
    ), 0) || 0;
  }, [cartData]);

  const globalDiscount = useMemo(() => {
    return getValidGlobalDiscount(discounts, totalProductCost);
  }, [discounts, totalProductCost]);

  const globalDiscountAmount = useMemo(() => {
    return getValidDiscountAmount(globalDiscount, totalProductCost);
  }, [globalDiscount, totalProductCost]);

  const couponDiscountAmount = useMemo(() => {
    return getValidDiscountAmount(couponDiscount, totalProductCost - globalDiscountAmount);
  }, [couponDiscount, globalDiscountAmount, totalProductCost]);

  const totalDiscountAmount = useMemo(() => {
    return globalDiscountAmount + couponDiscountAmount;
  }, [globalDiscountAmount, couponDiscountAmount]);

  const subTotalAfterDiscount = useMemo(() => {
    return Math.max(totalProductCost - totalDiscountAmount, 0);
  }, [totalProductCost, totalDiscountAmount]);

  const shippingCost = 200;
  const tax = 0;

  const total = useMemo(() => {
    return subTotalAfterDiscount + shippingCost + tax;
  }, [subTotalAfterDiscount]);

  useEffect(() => {
    if (!initialLoading) {
      if (!cartData || cartData.length === 0) {
        router.push(`${getBasePath()}/cart`);
      }
      setLoading(false);
    }
  }, [initialLoading, cartData, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!paymentFormValidate(formData, setErrors)) {
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
      try {
        await fetch(`http://localhost:1234/api/v1/jazzcash`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Testing",
          }),
        });
      } catch (err) {
        console.error("❌ Failed to update payment status:", err);
      }
      setLoading(true)
      const credentials = await getHashedPaymentCredential(store?._id, selectedMethod)
      const { merchantId, pp_Password, integritySalt } = credentials
      jazzCashPayment({ merchantId, password: pp_Password, salt: integritySalt, amount: 1000, returnUrl: 'https://dev.xperiode.com/store/683e8be81cd7939b6e016b92/payment/responce', phone: '0321-8969332', isTestAccount: true });
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
          <div className="flex justify-between items-center w-full py-[10px]">
            <Link href={`${getBasePath()}/`} className="flex">
              <img src={SiteLogo?.image} alt={''} className="w-24 max-h-16 object-contain object-left" />
            </Link>
            <Link href={`${getBasePath()}/cart`} className="flex items-end gap-2 cartButton text-[var(--tmp-txt)] hover:!text-yellow-500 ">
              <span className='text-sm'>Back to cart</span>
              <div className=" text-[24px] relative" >
                <SlHandbag />
                <span className="absolute flex justify-center items-center text-[12px] w-[18px] h-[18px] rounded-full bg-[var(--tmp-acc)] right-[-4px] bottom-[-6px]">
                  {totalCalculate(cartData)}
                </span>
              </div>
            </Link>
          </div>
          <PaymentForm total={total} shipping={shippingCost} discount={totalDiscountAmount} cartItem={cartData} tax={tax} selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
        </div>
      </div>

      <div className="h-screen bg-[var(--tmp-acc)] w-full px-8 py-2 flex justify-start sticky top-0">
        <div className="max-w-[500px] w-full flex flex-col h-full">
          {/* Optional mobile summary toggle */}
          <div className="h-[60px] w-full hidden max-[700px]:flex justify-between items-center">
            <p
              className="flex items-center gap-2 text-[#299ae0]"
              onClick={() => setCartIsVisible(!cartIsVisible)}
            >
              Show Order summary {cartIsVisible ? <FaChevronUp /> : <FaChevronDown />}
            </p>
            <p className="text-[#252525]">Rs {total?.toFixed(2)}</p>
          </div>
          <h2 className="text-[24px] font-semibold mb-1 text-[var(--tmp-txt)]">Reciept</h2>


          {/* This grows and scrolls if needed */}
          <ProductsReciept products={cartData} />

          {/* Sticks at bottom */}
          <PaymentSummary
            totalProductCost={totalProductCost}
            couponDiscount={couponDiscount}
            globalDiscount={globalDiscount}
            subTotal={subTotalAfterDiscount}
            shippingCost={shippingCost}
            tax={tax}
            total={total}
            className="bottom-0"
          >
            <ApplyCoupon
              email={"abc@gmail.com"}
              totalProductCost={
                totalProductCost - getValidDiscountAmount(globalDiscount, totalProductCost)
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
              className="bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] mt-4 rounded-md !w-full !py-[12px]"
            />
          </PaymentSummary>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
