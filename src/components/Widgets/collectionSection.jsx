"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CollectionCard from "../Cards/collectionCard";
import { getBasePath } from "@/Utils/GetBasePath";

const CollectionSection = ({ Categories, content, toShowLink = true }) => {
  const { categories } = useSelector((state) => state.categories);
  const basePath = getBasePath();

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center m-6">
        <p className="text-[30px] font-normal text-center">No categories available...</p>
      </div>
    );
  }

  let categoriesToDisplay = [];

  if (Array.isArray(Categories)) {
    if (Categories.includes("all")) {
      categoriesToDisplay = categories; // Show all categories
    } else {
      categoriesToDisplay = categories.filter(cat => Categories.includes(cat.name));
    }
  } else {
    categoriesToDisplay = categories.slice(0, Categories);
  }

  return (
    <div className="m-6 flex flex-col gap-[25px]">
      {toShowLink && (
        <div className="flex justify-between items-center">
          <h1 className="mt-2 text-[30px] font-semibold text-start">{content?.title || 'Collections'}</h1>
          <Link
            href={`${basePath}/collection`}
            className="mt-2 text-[15px] w-[100px] cursor-pointer flex gap-[10px] hover:gap-[17px] transition-all items-center"
          >
            Browse All <FaArrowRightLong />
          </Link>
        </div>
      )}
      <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-5">
        {categoriesToDisplay?.map((category, index) => (
          <CollectionCard key={index} collection={category} />
        ))}
      </div>
    </div>
  );
};

export default CollectionSection;
