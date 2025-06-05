"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/Loader/loader";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiDraggable } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RxExternalLink } from "react-icons/rx";
import Link from "next/link";
import ActionCard from "@/components/Cards/ActionCard";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";

const pagesIcons = {
    "About Us": "https://img.icons8.com/color/48/about.png",
    FAQ: "https://img.icons8.com/office/40/ask-question.png",
    Contact: "https://img.icons8.com/color/48/add-contact-to-company.png",
    "Terms and Conditions": "https://img.icons8.com/color/48/terms-and-conditions.png",
    "Privacy Policy": "https://img.icons8.com/color/48/privacy-policy.png",
    "Site Logo": "https://img.icons8.com/stickers/50/geometry.png",
    "Manufacture Process": "https://img.icons8.com/3d-fluency/50/chemical-plant.png",
    "Our Quality": "https://img.icons8.com/3d-fluency/50/guarantee.png",
    "Hero Banner": "https://img.icons8.com/3d-fluency/50/old-shop.png",
    "Return Policy": "https://img.icons8.com/color/48/return.png",
    "Shipping Policy": "https://img.icons8.com/color/48/in-transit--v1.png",
    "Fabric Remants": "https://img.icons8.com/color/48/polishing-cloth.png",
};

const Content = () => {
    const { pagesData, pagesDataLoading } = useSelector((state) => state.pagesData);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(pagesData || []);
    }, [pagesData]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        setItems((prevItems) => {
            const reordered = [...prevItems];
            const [movedItem] = reordered.splice(result.source.index, 1);
            reordered.splice(result.destination.index, 0, movedItem);
            return reordered;
        });
    };

    if (pagesDataLoading) return <Loader />;

    return (
        <BackgroundFrame>
            <ActionCard
                label={"Update Pages"}
                actionPosition="hidden"
                className={'!px-5 !py-3 !h-[calc(100vh-92px)]'}
            >
                <div className="space-y-3 px-[8px] h-full overflow-y-auto customScroll">
                    {items.map((item, index) => (
                        <div
                            className={`relative flex    items-center pt-2 pb-4 border-b border-gray-300 bg-backgroundC transition-all duration-300 `}
                        >
                            <div className="flex text-[14px] text-[#787676] cursor-grab">
                                {index}
                            </div>

                            <div className="ml-3 flex flex-col ">
                                <h2 className="text-lg font-medium text-gray-900">{item.type}</h2>
                                <div className="flex gap-3">
                                    <Link
                                        href={`/content/${item._id}`}
                                        className="text-sm cursor-pointer text-primaryC flex items-center gap-1"
                                    >
                                        Edit <RxExternalLink size={12} />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </ActionCard>
        </BackgroundFrame>
    );
};

export default Content;
