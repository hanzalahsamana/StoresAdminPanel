"use client";

import Loader from '@/components/TemplateComponents/UI/loader';
import PaymentForm from '@/components/TemplateComponents/UI/PaymentForm';
import ProductsRecipt from '@/components/TemplateComponents/UI/productsRecipt';
import { getBasePath } from '@/Utils/GetBasePath';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { useSelector } from 'react-redux'

const Checkout = () => {
  const router = useRouter()
  const [cartIsVisible, setCartIsVisible] = useState(false)
  const { cartData, initialLoading } = useSelector((state) => state?.cartData);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  })

  useEffect(() => {
    if (!initialLoading) {
      if (!cartData || cartData?.length === 0) {
        router.push(`${getBasePath()}/cart`)
      }
      setLoading(false)
    }

  }, [cartData, router])
  if (initialLoading || loading) {
    // return (
    //   <Loader />
    // )
  }

  const totalProductCost = cartData?.reduce((total, product) => {
    return total + (product.discountedPrice * product.quantity);
  }, 0);
  const shippingCost = 200;
  const tax = 0;
  const discount = 0;
  const total = (totalProductCost + shippingCost + tax) - discount;

  return (
    <div className='flex w-full max-[700px]:flex-col-reverse' >
      <div className='w-full bg-white'>
        <PaymentForm total={total} shipping={shippingCost} discount={discount} cartItem={cartData} tax={tax} />
      </div>
      <div className={`bg-[#F5F5F5] w-full p-[30px]  max-[700px]:py-[0px] ${cartIsVisible ? 'max-[700px]:h-auto' : 'max-[700px]:h-[60px]'} transition-height duration-500 max-[700px]:overflow-hidden`}>
        <div className='h-[60px] w-full hidden max-[700px]:flex justify-between items-center'>
          <p className='flex items-center gap-2 text-[#299ae0]' onClick={() => setCartIsVisible(!cartIsVisible)}>
            Show Order summary {cartIsVisible ? <FaChevronUp /> : <FaChevronDown />}
          </p>
          <p className='text-[#252525]'>Rs {total?.toFixed(2)}</p>
        </div>
        <div>

          <ProductsRecipt products={cartData} />
          <div className='max-w-[500px] flex flex-col gap-2 py-[25px]'>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Total Product Cost</span><span>Rs {totalProductCost?.toFixed(2)}</span></p>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Shipping Cost</span><span>Rs {shippingCost?.toFixed(2)}</span></p>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Tax</span><span>{tax > 0 ? `Rs ${tax?.toFixed(2)}` : '---'} </span></p>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Discount</span><span>{discount > 0 ? `Rs ${discount?.toFixed(2)}` : '---'} </span></p>
            <p className='w-full flex justify-between text-[18px]  font-semibold mt-[10px]'><span>Total</span><span>Rs {total?.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout