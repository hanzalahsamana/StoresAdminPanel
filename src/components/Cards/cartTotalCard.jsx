'use client';
import React from 'react';
import Button from '../Actions/Button';
import { useRouter } from 'next/navigation';
import { getBasePath } from '@/Utils/GetBasePath';

const CartTotalCard = ({ totalPrice }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-end gap-5 max-[750px]:items-center px-[30px] py-12 justify-center text-[var(--tmp-txt)]">
      <div className="flex gap-[50px]">
        <p>Estimated total</p>
        <p className="font-bold">Rs. {totalPrice?.toFixed(2)} PKR</p>
      </div>
      <div>
        <p className="text-center">Taxes, discounts and shipping calculated at checkout.</p>
      </div>
      <div className="w-[450px] max-[750px]:w-[80%]">
        <Button
          action={() => router.push(`${getBasePath()}/checkout`)}
          variant="store"
          label="Go To Checkout"
          className="font-bold  transition-all duration-300 hover:scale-105 !h-[50px]"
          size=""
        />
      </div>
    </div>
  );
};

export default CartTotalCard;
