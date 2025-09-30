'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdSignalWifiConnectedNoInternet2 } from 'react-icons/md';
import Loader from '@/components/Loader/TemplateLoader';
import ProductDetailCard from '@/components/Cards/productDetailCard';
import ProductsSection from '@/components/Widgets/ProductsSection';
import AddReviews from '@/components/Widgets/AddReviews';
import { getReview } from '@/APIs/Customer/Review';
import ReviewsList from '@/components/UI/ReviewList';
import TabNavigation from '@/components/Widgets/TabNavigation';
import ProductDescription from '@/components/Sections/ProductDescription';
import { getProducts } from '@/APIs/Product/getProducts';
import { getSingleProduct } from '@/APIs/Product/getSingleProduct';
import TemplateHeader from '@/components/Layout/TemplateHeader';

const ProductDetail = ({ params }) => {
  // const { products, loading, error } = useSelector((state) => state.productData);
  const [allReviews, setAllReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { store } = useSelector((state) => state.store);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch product
  useEffect(() => {
    if (!store._id || !params?.id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { product, reviews, relatedProducts } = await getSingleProduct(store._id, params.id);
        // const reviewsPromise = getReview(store._id, params.id);

        // const [productData, reviews] = await Promise.all([productPromise, reviewsPromise]);

        setProduct(product || {});
        setAllReviews(reviews);
        setRelatedProducts(relatedProducts);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [store._id, params?.id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex gap-2 text-[25px] justify-center py-[40px] items-center ">
        {error} <MdSignalWifiConnectedNoInternet2 />
      </div>
    );
  }
  // const product = products?.find(item => item?._id === params?.id);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const allReviews = await getReview(store?._id, params?.id);
  //     setAllReviews(allReviews)
  //   };

  //   fetchReviews();
  // }, [store?._id, params?.id]);

  console.log('relatedProducts', relatedProducts);

  return (
    <>
      {product ? (
        <>
          <ProductDetailCard product={product} />
          <ProductDescription />
          <ProductsSection
            sectionData={{
              heading: 'You may also like,',
              products: relatedProducts,
            }}
          />
          <ReviewsList allReviews={allReviews} />
          <AddReviews storeId={store?._id} productSlug={params?.id} setReviewInState={setAllReviews} />
        </>
      ) : (
        <p className="w-full text-center py-[100px] text-[24px] text-[#3a3a3a] ">No product Found</p>
      )}
    </>
  );
};

export default ProductDetail;
