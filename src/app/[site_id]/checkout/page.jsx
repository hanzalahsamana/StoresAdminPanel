'use client';

import ProductsRecipt from '@/components/UI/productsRecipt';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import PaymentForm from '@/components/Forms/PaymentForm';
import ApplyCoupon from '@/components/Forms/ApplyCoupon';
import React, { useEffect, useMemo, useState } from 'react';
import { getBasePath } from '@/Utils/GetBasePath';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Checkout = () => {
  const router = useRouter();
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const { cartData, initialLoading } = useSelector((state) => state?.cartData);
  const [loading, setLoading] = useState(true);
  const [discountInfo, setDiscountInfo] = useState({ discountType: 'fixed', amount: 0, source: 'global' });
  const { discounts } = useSelector((state) => state?.storeDetail?.storeDetail || {});

  useEffect(() => {
    if (!initialLoading) {
      if (!cartData || cartData?.length === 0) {
        router.push(`${getBasePath()}/cart`);
      }
      setLoading(false);
    }
  }, [cartData, router]);

  useEffect(() => {
    const globalDiscount = discounts?.find(d => d.discountType === 'global');
    if (globalDiscount) {
      setDiscountInfo({
        discountType: globalDiscount?.amountType === 'percentage' ? 'percent' : 'fixed',
        amount: globalDiscount?.amount,
        source: globalDiscount?.name,
      });
    }
  }, [discounts]);

  const totalProductCost = useMemo(() => {
    return cartData?.reduce((total, product) => {
      return total + (product.discountedPrice * product.quantity);
    }, 0) || 0;
  }, [cartData]);

  const shippingCost = 200;
  const tax = 0;

  const discount = useMemo(() => {
    if (discountInfo.discountType === 'percent') {
      return (totalProductCost * discountInfo.amount) / 100;
    } else if (discountInfo.discountType === 'fixed') {
      return discountInfo.amount;
    }
    return 0;
  }, [discountInfo, totalProductCost]);

  const total = useMemo(() => {
    return (totalProductCost + shippingCost + tax) - discount;
  }, [totalProductCost, shippingCost, tax, discount]);

  return (
    <div className='flex w-full max-[700px]:flex-col-reverse'>
      <div className='w-full bg-[text-[var(--tmp-pri)]]'>
        <PaymentForm total={total} shipping={shippingCost} discount={discount} cartItem={cartData} tax={tax} />
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

          <div className='flex flex-col gap-2 py-[25px] text-[var(--tmp-ltxt)]'>
            <p className='w-full flex justify-between text-[14px] font-semibold'><span>Total Product Cost</span><span>Rs {totalProductCost?.toFixed(2)}</span></p>
            <p className='w-full flex justify-between text-[14px]'><span>Shipping Cost</span><span>Rs {shippingCost?.toFixed(2)}</span></p>
            <p className='w-full flex justify-between text-[14px]'><span>Tax</span><span>{tax > 0 ? `Rs ${tax?.toFixed(2)}` : '---'}</span></p>
            <p className='w-full flex justify-between text-[14px]'><span>Discount</span><span>{discount > 0 ? `Rs ${discount?.toFixed(2)}` : '---'}</span></p>
            <p className='w-full flex justify-between text-[20px] text-[var(--tmp-txt)] font-semibold mt-[10px]'><span>Total</span><span>Rs {total?.toFixed(2)}</span></p>
          </div>

          <ApplyCoupon
            totalProductCost={totalProductCost}
            onDiscountApply={({ discountType, amount, source }) => {
              setDiscountInfo({ discountType, amount, source });
            }}
          />

          <div>
            <p className='text-[var(--tmp-txt)] text-[14px] py-3'>
              By placing this order, you agree to our <Link href={`${getBasePath()}/pages/terms-of-service`} className='text-[#299ae0] cursor-pointer'>Terms of Service</Link> and <Link href={`${getBasePath()}/pages/privacy-policy`} className='text-[#299ae0] cursor-pointer'>Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
