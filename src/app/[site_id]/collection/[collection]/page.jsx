"use client";
import ProductsSection from '@/components/Widgets/productsSection';
import Loader from '@/components/Loader/TemplateLoader';
import React from 'react'
import { MdSignalWifiConnectedNoInternet2 } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Collection = ({ params }) => {
  const { loading, error } = useSelector((state) => state.productData);

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

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <ProductsSection content={{
      title: capitalizeFirstLetter(params?.collection),
      maxLength: Infinity,
      productType: "Selected Categories",
      selectedProducts: [],
      selectedCategories: [params?.collection]
    }} />
  )
}

export default Collection
