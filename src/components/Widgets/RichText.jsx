import { getBasePath } from '@/Utils/GetBasePath';
import Link from 'next/link';
import React from 'react'

const RichText = ({ content }) => {
    return (
        <div className="flex bg-[var(--tmp-pri)] justify-center items-center flex-col gap-[40px] py-[40px] px-[15px]">
            <h1 className="text-[30px] text-[var(--tmp-txt)] font-extrabold text-center">{content?.title}</h1>
            <div className="text-lg text-center leading-relaxed text-[var(--tmp-ltxt)]" dangerouslySetInnerHTML={{ __html: content?.text }}>
            </div>
            <Link
                href={`${getBasePath()}/products`}
                className="flex justify-center px-[35px] py-[10px] w-max bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] transition-all duration-300 hover:scale-105"
            >
                {content?.buttonText || "Shop Now"}
            </Link>
        </div>
    )
}

export default RichText;