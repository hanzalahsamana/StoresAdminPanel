"use client";

import Link from "next/link";
import "./style.css";
import { useSelector } from "react-redux";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import { getBasePath } from "@/Utils/GetBasePath";
const FabricsAbout = () => {

  const selectedPage = useSelector((state) =>
    selectPageByType(state, "Fabric Remants")
  );

  return (
    <div className="fabric-container">
      <div className="fabric-img">
        <div className="fabric-text-wrap">
          <h2 className="text-xl font-bold">{selectedPage?.title}</h2>
          <div className="mt-4 max-h-[150px] customScroll overflow-auto leading-6 text-[#4a4a4a]" dangerouslySetInnerHTML={{ __html: selectedPage?.text }}>
          </div>
          <Link href={`${getBasePath()}/products`} className="flex justify-center py-[15px] w-full mt-6 bg-black text-[#e6e6e6] text-[16px]  transition-all duration-300 hover:scale-105">
            {selectedPage?.buttonText || "Shop Now"}
          </Link>
        </div>
        <img
          src={selectedPage?.image}
          alt={selectedPage?.title}
          className="object-cover aspect-[2/3] max-h-[500px]"
        />
      </div>
    </div>
  );
};

export default FabricsAbout;
