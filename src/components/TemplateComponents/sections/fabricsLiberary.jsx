"use client";

import { useSelector } from "react-redux";
import "./style.css";

const FabricsLiberary = () => {

  const selectedPage = useSelector((state) =>
    selectPageByType(state, "Manufacture Process")
  );
  return (
    <div className="fabric-cutting-container py-[10px]">
      <div className="fabric-img">
        <div className="fabric-text-wrap">
          <h2 className="!text-[30px]">{selectedPage?.title}</h2>
          <div className="max-h-[200px] customScroll overflow-auto leading-6 text-[#4a4a4a]" dangerouslySetInnerHTML={{ __html: selectedPage?.text }}>
          </div>
        </div>
        <img
        className="aspect-[4/2] object-cover"
          src={selectedPage?.image}
          alt={selectedPage?.title}
        />
      </div>
    </div>
  );
};

export default FabricsLiberary;
