"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CollectionCard from "../Cards/collectionCard";
import { getBasePath } from "@/Utils/GetBasePath";

const CollectionSection = ({ content = {}, toShowLink = true }) => {
  const { title = "Featured Collections" , selectedCategories = []} = content

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

  if (Array.isArray(selectedCategories)) {
    if (selectedCategories?.length === 0) {
      categoriesToDisplay = categories; // Show all categories
    } else {
      categoriesToDisplay = categories.filter(cat => selectedCategories.includes(cat.link));
    }
  } else {
    categoriesToDisplay = categories;
  }

  return (
    <div className="p-6 flex flex-col gap-[25px] bg-[var(--tmp-pri)]">
      {toShowLink && (
        <div className="flex justify-between items-center">
          <h1 className="mt-2 text-[30px] text-[var(--tmp-txt)] font-semibold text-start">{title || 'Collections'}</h1>
          <Link
            href={`${basePath}/collection`}
            className="mt-2 text-[15px] text-[var(--tmp-ltxt)] w-[130px] cursor-pointer flex gap-[10px] hover:gap-[17px] transition-all items-center"
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
