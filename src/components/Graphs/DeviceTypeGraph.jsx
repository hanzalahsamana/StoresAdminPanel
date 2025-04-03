import React from "react";
import { CiMobile1 } from "react-icons/ci";
import { IoIosDesktop, IoMdTabletLandscape } from "react-icons/io";

const DeviceTypeGraph = ({ views }) => {
    return (
        <div className="flex justify-around items-center p-6 w-full">
            {/* Mobile */}
            <div className="flex flex-col items-center text-[#434343] ">
                <CiMobile1 className="" size={70} />
                <p className="text-[12px] text-[#99abb4] mt-2">Mobile</p>
                <div className="flex justify-center gap-2 items-center">

                <p className="text-textTC">{views?.mobile || 0} views</p>
                </div>
            </div>

            {/* Tablet */}
            <div className="flex flex-col items-center text-[#434343]">
                <IoMdTabletLandscape className="" size={70} />
                <p className="text-[12px] text-[#99abb4] mt-2">Tablet</p>
                <div className="flex justify-center gap-2 items-center">

                <p className="text-textTC">{views?.tablet || 0} views</p>
                </div>
            </div>

            {/* Desktop */}
            <div className="flex flex-col items-center text-[#434343]">
                <IoIosDesktop className="" size={70} />
                <p className="text-[12px] text-[#99abb4] mt-2">Desktop</p>
                <div className="flex justify-center gap-2 items-center">

                <p className="text-textTC">{views?.desktop || 0} views</p>
                </div>
            </div>
        </div>
    );
};

export default DeviceTypeGraph;