"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CollectionCard from "../Cards/collectionCard";
import { getBasePath } from "@/Utils/GetBasePath";

const CollectionSection = ({ content = {}, toShowLink = true }) => {
  const { title = "Featured Collections", selectedCategories = [] } = content

  const { categories } = useSelector((state) => state.categories);
  const basePath = getBasePath();

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center p-6 bg-[var(--tmp-pri)] text-[--tmp-txt] ">
        <p className="text-[30px] font-normal text-center">No categories available...</p>
      </div>
    );
  }

  let categoriesToDisplay = [];

  if (Array.isArray(selectedCategories) && selectedCategories.length > 0) {
    categoriesToDisplay = categories.filter(cat => selectedCategories.includes(cat.link));
  } else {
    categoriesToDisplay = categories; // Show all categories if none are selected

    // Ensure at least 3 categories by duplicating
    while (categoriesToDisplay.length < 3) {
      categoriesToDisplay = [...categoriesToDisplay, ...categoriesToDisplay].slice(0, 3);
    }
  }

  return (
    <div className="p-2 md:p-6 flex flex-col gap-[25px] bg-[var(--tmp-pri)]">
      {toShowLink && (
        <div className="flex justify-between items-center">
          <h1 className="mt-2 md:text-[30px] text-[var(--tmp-txt)] font-semibold text-start">{title || 'Collections'}</h1>
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
