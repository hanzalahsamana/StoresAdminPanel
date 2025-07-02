"use client";

import { ScrollShadows, useScrollShadow } from "@/Hooks/useScrollShadow";
import ProductRecieptCard from "../Cards/productRecieptCard";

export default function ProductsReciept({ products }) {
  const { scrollRef, showTopShadow, showBottomShadow } = useScrollShadow([products]);

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={scrollRef}
        className="overflow-y-auto customScroll p-3 h-full"
      >
        {products?.map((item) => (
          <ProductRecieptCard key={item._id} product={item} />
        ))}
      </div>

      <ScrollShadows
        showTopShadow={showTopShadow}
        showBottomShadow={showBottomShadow}
      />
    </div>
  );
}
