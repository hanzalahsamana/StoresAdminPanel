"use client";

import Link from "next/link";
import "./style.css";
import { getBasePath } from "@/Utils/GetBasePath";
import { forwardRef } from "react";

const PromoWidget = forwardRef(({ sectionData, ...rest }, ref) => {
    const { style = 'style1', heading, content, image, buttonText } = sectionData;
    console.log(image, "Image in PromoWidget");
    

    return (
        <div {...rest} ref={ref} className={style === "style1" ? "febric-Collection" : "fabric-container"}>
            <div className={style === "style1" ? "img-wrap" : "fabric-img"}>
                {style === "style2" && (
                    <div className="fabric-text-wrap">
                        <h2 className="text-xl text-[var(--tmp-txt)] font-bold">{heading}</h2>
                        <div className="ql-editor mt-4 max-h-[150px] customScroll overflow-auto leading-6 text-[var(--tmp-ltxt)]"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                        <Link
                            href={`${getBasePath()}/products`}
                            className="flex justify-center py-[15px] w-full mt-6 bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] transition-all duration-300 hover:scale-105"
                        >
                            {buttonText || "Shop Now"}
                        </Link>
                    </div>
                )}

                <img
                    className={style === "style1" ? "aspect-square object-contain p-[35px]" : "object-cover aspect-[2/3] max-h-[500px]"}
                    src={image}
                    alt={heading}
                />
            </div>

            {style === "style1" && (
                <div className="text-wrap">
                    <h1 className="text-[25px] text-[var(--tmp-txt)]">{heading}</h1>
                    <div
                        className="ql-editor leading-6 max-h-[230px] pr-[15px] customScroll overflow-auto text-[var(--tmp-ltxt)]"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                    <Link
                        href={`${getBasePath()}/products`}
                        className="flex justify-center py-[15px] w-full mt-6 bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] transition-all duration-300 hover:scale-105"
                    >
                        {buttonText || "Shop Now"}
                    </Link>
                </div>
            )}
        </div>
    );
});

export default PromoWidget;
