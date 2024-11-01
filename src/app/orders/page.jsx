"use client";

import Loader from '@/components/loader';
import ProductsRecipt from '@/components/productsRecipt';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useSelector } from 'react-redux'

const Order = () => {
  const router = useRouter()
  const [cartIsVisible, setCartIsVisible] = useState(false)
  const { orders, loading } = useSelector((state) => state?.orderData);

  console.log("orders", orders)
  if (loading) {
    return (
      <Loader />
    )
  }

  const totalProductCost = orders?.[0].orderData?.reduce((total, product) => {
      return total + (product.discountedPrice * product.quantity);
    }, 0);

  console.log("totalProductCost",totalProductCost)
  const shippingCost = 200;
  const tax = 0;
  const discount = 0;
  const total = (totalProductCost + shippingCost + tax) - discount;

  return (
    <div className='flex w-full max-[700px]:flex-col-reverse' >
      <div className='w-full bg-white'>
      </div>
      <div className={`bg-[#F5F5F5] w-full p-[30px]  max-[700px]:py-[0px] ${cartIsVisible ? 'max-[700px]:h-auto' : 'max-[700px]:h-[60px]'} transition-height duration-500 max-[700px]:overflow-hidden`}>
        <div className='h-[60px] w-full hidden max-[700px]:flex justify-between items-center'>
          <p className='flex items-center gap-2 text-[#299ae0]' onClick={() => setCartIsVisible(!cartIsVisible)}>
            Show Order summary {cartIsVisible ? <FaChevronUp /> : <FaChevronDown />}
          </p>
          <p className='text-[#252525]'>Rs {total?.toFixed(2)}</p>
        </div>
        <div>

          <ProductsRecipt products={orders} />
          <div className='max-w-[500px] flex flex-col gap-2 py-[25px]'>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Total Product Cost</span><span>Rs {totalProductCost?.toFixed(2)}</span></p>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Shipping Cost</span><span>Rs {shippingCost?.toFixed(2)}</span></p>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Tax</span><span>{tax > 0 ? `Rs ${tax?.toFixed(2)}` : '---'} </span></p>
            <p className='w-full flex justify-between text-[14px]  font-semibold'><span>Discount</span><span>{discount > 0 ? `Rs ${discount?.toFixed(2)}` : '---'} </span></p>
            <p className='w-full flex justify-between text-[18px]  font-semibold mt-[10px]'><span>Total</span><span>Rs {total?.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
          {/* <ProductsRecipt products={orders} /> */}

    </div>
  )
}

export default Order