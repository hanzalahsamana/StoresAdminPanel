'use client';
import { getBasePath } from '@/Utils/GetBasePath';
import { totalCalculate } from '@/Utils/Calculators';
import Link from 'next/link';
import { SlHandbag } from 'react-icons/sl';
import { useSelector } from 'react-redux';

const CheckoutHeader = ({ sectionData }) => {
  const { cartData } = useSelector((state) => state?.cartData);
  const { store } = useSelector((state) => state?.store);
  const { checkoutLogo, globalLogo } = sectionData || {};

  return (
    <div className="flex justify-between items-center w-full py-[10px]">
      <Link href={`${getBasePath()}/`} className="flex">
        {(store?.branding?.logo || checkoutLogo) && <img src={globalLogo ? store?.branding?.logo : checkoutLogo} alt="Site Logo" className="w-20 max-h-12 object-contain" />}
      </Link>
      <Link href={`${getBasePath()}/cart`} className="flex items-end gap-2 cartButton text-[var(--tmp-txt)] hover:!text-yellow-500 ">
        <span className="text-sm">Back to cart</span>
        <div className=" text-[24px] relative">
          <SlHandbag />
          <span className="absolute flex justify-center items-center text-[12px] w-[18px] h-[18px] rounded-full bg-[var(--tmp-acc)] right-[-4px] bottom-[-6px]">
            {totalCalculate(cartData)}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CheckoutHeader;
