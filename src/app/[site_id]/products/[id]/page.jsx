"use client";

import React from "react";
import { useSelector } from "react-redux";
import { MdSignalWifiConnectedNoInternet2 } from "react-icons/md";
import Loader from "@/components/Loader/TemplateLoader";
import ProductDetailCard from "@/components/Cards/productDetailCard";
import ProductsSection from "@/components/Widgets/productsSection";

const ProductDetail = ({ params }) => {
  const { products, loading, error } = useSelector((state) => state.productData);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='flex gap-2 text-[25px] justify-center py-[40px] items-center '>
        {error} <MdSignalWifiConnectedNoInternet2 />
      </div>
    );
  }
  const product = products?.find(item => item?._id === params?.id);


  return (
    <>
      {product ? (
        <>
          <ProductDetailCard product={product} />
          <ProductsSection content={{
            title: "You may also like,",
            maxLength: 4,
            productType: "Selected Categories",
            selectedCategories: [product?.collectionName]
          }} />
        </>
      ) : <p className="w-full text-center py-[100px] text-[24px] text-[#3a3a3a] ">No product Found</p>}
    </>
  );
};

export default ProductDetail;
