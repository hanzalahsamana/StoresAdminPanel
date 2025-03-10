"use client";

import Link from "next/link";
import "./style.css";
import { getBasePath } from "@/Utils/GetBasePath";

const PromoWidget = ({ content}) => {
    const { styleType = 'style1', title, text, image, buttonText } = content;

    return (
        <div className={styleType === "style1" ? "febric-category" : "fabric-container"}>
            <div className={styleType === "style1" ? "img-wrap" : "fabric-img"}>
                {styleType === "style2" && (
                    <div className="fabric-text-wrap">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <div
                            className="mt-4 max-h-[150px] customScroll overflow-auto leading-6 text-[#4a4a4a]"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                        <Link
                            href={`${getBasePath()}/products`}
                            className="flex justify-center py-[15px] w-full mt-6 bg-black text-[#e6e6e6] text-[16px] transition-all duration-300 hover:scale-105"
                        >
                            {buttonText || "Shop Now"}
                        </Link>
                    </div>
                )}

                <img
                    className={styleType === "style1" ? "aspect-square object-cover" : "object-cover aspect-[2/3] max-h-[500px]"}
                    src={image}
                    alt={title}
                />
            </div>

            {styleType === "style1" && (
                <div className="text-wrap">
                    <h1 className="text-[25px]">{title}</h1>
                    <div
                        className="leading-6 max-h-[230px] pr-[15px] customScroll overflow-auto text-[#4a4a4a]"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                    <Link
                        href={`${getBasePath()}/products`}
                        className="flex justify-center py-[15px] w-full mt-6 bg-black text-[#e6e6e6] text-[16px] transition-all duration-300 hover:scale-105"
                    >
                        {buttonText || "Shop Now"}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PromoWidget;
