import React from "react";
import ProductRecieptCard from "./productRecieptCard";

const ProductsRecipt = ({ products }) => {
  console.log('products',products)
  return (
    <>
      <div className="w-full max-w-[500px] bg-[#F5F5F5]">
        <div>
          <ProductRecieptCard product={products.orderData} />
        </div>
      </div>
    </>
  );
};

export default ProductsRecipt;
