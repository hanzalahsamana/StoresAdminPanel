"use client";

import ProductsSection from "@/components/Widgets/productsSection";

const Products = () => {
  return (
    <>
      {/* <LocationPicker /> */}
      <ProductsSection
        content={{
          title: "All Products",
          maxLength: Infinity,
          productType: "All",
        }}
      />

    </>
  );
};

export default Products;
