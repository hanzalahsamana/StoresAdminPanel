"use client";
import { getContentByName } from '@/Redux/ContentData/ContentDataSlice';
import { getBasePath } from '@/Utils/GetBasePath';
import { totalCalculate } from '@/Utils/Calculators';
import Link from 'next/link';
import { SlHandbag } from 'react-icons/sl';
import { useSelector } from 'react-redux';

const CheckoutHeader = () => {
    const { cartData } = useSelector((state) => state?.cartData);
    const SiteLogo = useSelector((state) => getContentByName(state, "Site Logo"));

    return (
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
    )
}

export default CheckoutHeader