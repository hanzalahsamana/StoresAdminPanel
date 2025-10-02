'use client';
import { forwardRef } from 'react';
import ProductCard from '../Cards/productCard';
import { MdSignalWifiConnectedNoInternet2 } from 'react-icons/md';
import ProductCardLoader from '../Loader/ProductCardLoader';

const ProductsSection = forwardRef(({ sectionData = {}, ...rest }, ref) => {
  const {
    heading = 'Our Products',
    productCount = 4,
    productsToShow = 'all',
    selectedProducts = [],
    selectedCollections = [],
    products = [],
    //optional
    isLoading = false,
    error = null,
  } = sectionData;

  if (isLoading && !products) {
    return <ProductCardLoader />;
  }

  if (error) {
    return (
      <div className="flex gap-2 text-[25px] justify-center py-[40px] items-center">
        {error.message || 'Something went wrong'} <MdSignalWifiConnectedNoInternet2 />
      </div>
    );
  }

  if (!products || products?.length === 0) {
    return <p className="text-[40px] font-bold text-[var(--tmp-txt)] text-center p-10">No Products found 🙄</p>;
  }

  return (
    <div {...rest} ref={ref} className="max-w-[1500px] w-full md:py-4 bg-[var(--tmp-pri)]">
      <h1 className="mb-6 text-[30px] text-[var(--tmp-txt)] font-semibold text-center">{heading}</h1>
      <div className="grid grid-cols-4 max-[1024px]:grid-cols-3 max-[750px]:grid-cols-2 max-[470px]:grid-cols-1 gap-2 m-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
});

export default ProductsSection;
