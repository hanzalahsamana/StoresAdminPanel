"use client";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CollectionCard from "../Cards/collectionCard";
import { getBasePath } from "@/Utils/GetBasePath";
import { forwardRef } from "react";

const CollectionSection = forwardRef(({ sectionData = {}, toShowLink = true, ...rest }, ref) => {
  const { heading = "Featured Collections", collectionIds = [], collections } = sectionData

  const basePath = getBasePath();

  console.log("CollectionSection content:", collectionIds);


  if (!collections || collections.length === 0) {
    return (
      <div className="text-center p-6 bg-[var(--tmp-pri)] text-[--tmp-txt] ">
        <p className="text-[30px] font-normal text-center">No collections available...</p>
      </div>
    );
  }

  let collectionsToDisplay = [...collections];

  while (collectionsToDisplay.length < 3) {
    collectionsToDisplay = [...collectionsToDisplay, ...collectionsToDisplay].slice(0, 3);
  }

  return (
    <div {...rest} ref={ref} className="p-2 md:p-6 flex flex-col gap-[25px] bg-[var(--tmp-pri)]">
      {toShowLink && (
        <div className="flex justify-between items-center">
          <h1 className="mt-2 md:text-[30px] text-[var(--tmp-txt)] font-semibold text-start">{heading || 'Collections'}</h1>
          <Link
            href={`${basePath}/collection`}
            className="mt-2 text-[15px] text-[var(--tmp-ltxt)] w-[130px] cursor-pointer flex gap-[10px] hover:gap-[17px] transition-all items-center"
          >
            Browse All <FaArrowRightLong />
          </Link>
        </div>
      )}
      <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-5">
        {collectionsToDisplay?.map((Collection, index) => (
          <CollectionCard key={index} collection={Collection} />
        ))}
      </div>
    </div>
  );
});

export default CollectionSection;
