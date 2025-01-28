"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/TemplateComponents/UI/loader";
import CartProductCard from "@/components/TemplateComponents/UI/cartProductCard";
import CartTotalCard from "@/components/TemplateComponents/UI/cartTotalCard";
import EmptyCart from "@/components/TemplateComponents/sections/emptyCart";

const Cart = () => {
  const  { cartData, initialLoading }  = useSelector((state) => state?.cartData || []);
  const [loading , setLoading] = useState(true)
  useEffect(()=>{
    setLoading(false)
  })
  if(initialLoading || loading){
    return(
      <Loader/>
    )
  }

  const totalPrice = cartData?.reduce((accumulator, cartItem) => {
    return accumulator + (cartItem.discountedPrice * cartItem.quantity)
  }, 0);
  
  return (
    <div className="flex items-center flex-col w-full">
      <div className="max-w-[1000px] w-full pt-[50px]">
        {cartData?.length > 0 ? (
          <div>
            <div className="flex w-full justify-between items-center mb-3 px-[10px]">
              <h1 className="text-[30px]">Your Cart</h1>
              <Link className="text-[15px] underline" href={'/products'}>Continue Shopping</Link>
            </div>
            <div className='flex justify-between' >
              <h1 className="my-[20px] pl-[15px] text-[20px] w-1/2">Product</h1>
              <h1 className="my-[20px] pl-[15px] text-[20px] w-1/4">Quantity / Size</h1>
              <h1 className="my-[20px] pl-[15px] text-[20px] flex justify-center w-1/4">Amount</h1>
            </div>
            <div>
              {cartData?.map((product , i) => (
                <CartProductCard key={i} product={product} />
              ))}
            </div>
            <div>
            <CartTotalCard totalPrice={totalPrice}/>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
