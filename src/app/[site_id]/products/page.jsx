"use client";

import ProductsSection from "@/components/TemplateComponents/sections/productsSection";

const Products = () => {
  return (
    <>
      <ProductsSection maxLength={Infinity} collection={'all'} />
    </>
  );
};

export default Products;
