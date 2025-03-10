import { getBasePath } from '@/Utils/GetBasePath';
import Link from 'next/link';
import React from 'react'

const RichText = ({ content }) => {
    return (
        <div className="flex justify-center items-center flex-col gap-[40px] py-[40px] px-[15px]">
            <h1 className="text-[30px] font-bold font-[Inter] text-center">{content?.title}</h1>
            <div className="text-lg leading-relaxed text-textTC" dangerouslySetInnerHTML={{ __html: content?.text }}>
            </div>
            <Link
                href={`${getBasePath()}/products`}
                className="flex justify-center px-[35px] py-[10px] w-max bg-black text-[#e6e6e6] text-[16px] transition-all duration-300 hover:scale-105"
            >
                {content?.buttonText || "Shop Now"}
            </Link>
        </div>
    )
}

export default RichText;