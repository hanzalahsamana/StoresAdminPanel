"use client";

import ProductsSection from "@/components/Widgets/productsSection";

const Products = () => {
  return (
    <>
      <ProductsSection maxLength={Infinity} collection={'all'} />
    </>
  );
};

export default Products;
