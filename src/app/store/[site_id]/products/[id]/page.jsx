"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdSignalWifiConnectedNoInternet2 } from "react-icons/md";
import Loader from "@/components/Loader/TemplateLoader";
import ProductDetailCard from "@/components/Cards/productDetailCard";
import ProductsSection from "@/components/Widgets/productsSection";
import AddReviews from "@/components/Widgets/addReviews";
import { getReview } from "@/APIs/Customer/Review";
import ReviewsList from "@/components/UI/ReviewList";
import TabNavigation from "@/components/Widgets/TabNavigation";
import ProductDescription from "@/components/Sections/ProductDescription";

const ProductDetail = ({ params }) => {
  const { products, loading, error } = useSelector((state) => state.productData);
  const [allReviews, setAllReviews] = useState([])
  const { store } = useSelector((state) => state.store);


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

  useEffect(() => {
    const fetchReviews = async () => {
      const allReviews = await getReview(store?._id, params?.id);
      setAllReviews(allReviews)
    };

    fetchReviews();
  }, [store?._id, params?.id]);


  return (
    <>
      {product ? (
        <>
          <ProductDetailCard product={product} />
          <ProductDescription/>
          <ProductsSection content={{
            title: "You may also like,",
            maxLength: 4,
            productType: "Selected collections",
            selectedcollections: [product?.collectionName]
          }} />
          <ReviewsList allReviews={allReviews} />
          <AddReviews storeId={store?._id} productId={params?.id} setReviewInState={setAllReviews} />
        </>

      ) : <p className="w-full text-center py-[100px] text-[24px] text-[#3a3a3a] ">No product Found</p>}
    </>
  );
};

export default ProductDetail;
