import { getBasePath } from '@/Utils/GetBasePath';
import Link from 'next/link';
import React, { forwardRef } from 'react'

const RichText = forwardRef(({ sectionData, ...rest }, ref) => {
    const { heading, content, buttonText, style } = sectionData
    return (
        <div {...rest} ref={ref} className="flex bg-[var(--tmp-pri)] justify-center items-center flex-col gap-[40px] py-[40px] px-[15px]">
            {heading && (<h1 className="text-[30px] text-[var(--tmp-txt)] font-extrabold text-center">{heading}</h1>)}

            {content && (<div className="ql-editor text-lg text-center leading-relaxed text-[var(--tmp-ltxt)]" dangerouslySetInnerHTML={{ __html: content }}></div>)}

            {buttonText && (
                <Link href={`${getBasePath()}/products`} className="flex justify-center px-[35px] py-[10px] w-max bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] transition-all duration-300 hover:scale-105">
                    {buttonText || "Shop Now"}
                </Link>
            )}
        </div>
    )
})

export default RichText;