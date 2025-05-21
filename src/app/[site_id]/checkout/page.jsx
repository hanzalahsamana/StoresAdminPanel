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
import LocationPicker from '@/components/Uploaders/LocationPicker';

const Checkout = () => {
  const router = useRouter();
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(null);
  const { cartData, initialLoading } = useSelector((state) => state?.cartData);
  const { discounts } = useSelector((state) => state?.storeDetail?.storeDetail || {});

  const totalProductCost = useMemo(() => {
    return cartData?.reduce((total, product) => (
      total + (product.discountedPrice * product.quantity)
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

  return (
    <div className='flex w-full max-[700px]:flex-col-reverse'>
      <div className='w-full bg-[text-[var(--tmp-pri)]]'>
        <PaymentForm total={total} shipping={shippingCost} discount={totalDiscountAmount} cartItem={cartData} tax={tax} />
      </div>

      <div className={`bg-[var(--tmp-acc)] w-full p-[30px] max-[700px]:py-[0px] ${cartIsVisible ? 'max-[700px]:h-auto' : 'max-[700px]:h-[60px]'} transition-height duration-500 max-[700px]:overflow-hidden`}>
        <div className='h-[60px] w-full hidden max-[700px]:flex justify-between items-center'>
          <p className='flex items-center gap-2 text-[#299ae0]' onClick={() => setCartIsVisible(!cartIsVisible)}>
            Show Order summary {cartIsVisible ? <FaChevronUp /> : <FaChevronDown />}
          </p>
          <p className='text-[#252525]'>Rs {total?.toFixed(2)}</p>
        </div>

        <div className='max-w-[500px]'>


          <ProductsRecipt products={cartData} />
          <PaymentSummary
            totalProductCost={totalProductCost}
            couponDiscount={couponDiscount}
            globalDiscount={globalDiscount}
            subTotal={subTotalAfterDiscount}
            shippingCost={shippingCost}
            tax={tax}
            total={total}
          >
            <ApplyCoupon
              email={'abc@gmail.com'}
              totalProductCost={totalProductCost - getValidDiscountAmount(globalDiscount, totalProductCost)}
              setCouponDiscount={setCouponDiscount}
            />

          </PaymentSummary>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
