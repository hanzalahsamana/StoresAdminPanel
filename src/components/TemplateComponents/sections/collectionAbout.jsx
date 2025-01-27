"use client";

import Link from "next/link";
import "./style.css";
import { useSelector } from "react-redux";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";

const CollectionAbout = () => {
  const selectedPage = useSelector((state) =>
    selectPageByType(state, "Our Quality")
  );
  return (
    <div className="febric-category">
      <div className="img-wrap">
        <div
          className="img-two"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <img className="aspect-square object-cover" src={selectedPage?.image} alt={selectedPage?.title} />
        </div>
      </div>
      <div className="text-wrap">
        <h1 className="text-[25px]">{selectedPage?.title}</h1>
        <div className=" leading-6 max-h-[230px] pr-[15px] customScroll overflow-auto  text-[#4a4a4a]" dangerouslySetInnerHTML={{ __html: selectedPage?.text }}>
        </div>
        <Link href={'/products'} className="flex justify-center py-[15px] w-full mt-6 bg-black text-[#e6e6e6] text-[16px]  transition-all duration-300 hover:scale-105">
          {selectedPage?.buttonText|| "Shop Now"}
        </Link>
      </div>
    </div>
  );
};

export default CollectionAbout;
