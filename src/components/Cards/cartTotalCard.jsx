import { getBasePath } from "@/Utils/GetBasePath";
import Link from "next/link";
import React from "react";

const CartTotalCard = ({ totalPrice }) => {
  return (
    <div className='flex flex-col items-end gap-5 max-[750px]:items-center px-[30px] py-12 border-t border-[#dbdbdb] justify-center text-[var(--tmp-txt)]'>
      <div className='flex gap-[50px]'>
        <p>Estimated total</p>
        <p className='font-bold'>Rs. {totalPrice?.toFixed(2)} PKR</p>
      </div>
      <div>
        <p className="text-center">Taxes, discounts and shipping calculated at checkout.</p>
      </div>
      <div className="w-[450px] max-[750px]:w-[80%]">
        <Link href={`${getBasePath()}/checkout`}>
          <button
            className="py-[15px] w-full mt-3 bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px]  transition-all duration-300 hover:scale-105"
          >
            Go to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartTotalCard;
