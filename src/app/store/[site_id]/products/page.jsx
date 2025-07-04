"use client";

import { getProducts } from "@/APIs/Product/getProducts";
import DropDown from "@/components/Actions/DropDown";
import ProductCard from "@/components/Cards/productCard";
import ProductsSection from "@/components/Widgets/productsSection";
import { useInfiniteScroll } from "@/Hooks/useInfiniteScroll";
import BASE_URL from "config";
import { useState } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const { store } = useSelector((state) => state.store);
  const [filter, setFilter] = useState('')
  // const { products } = useSelector((state) => state.productData);


  const handleGetProducts = async (page, limit) => {
    let queryParams = [];
    if (page !== undefined && page !== null) queryParams.push(`page=${page}`);
    if (limit !== undefined && limit !== null) queryParams.push(`limit=${limit}`);
    if (filter !== undefined && filter !== null && filter !== '') queryParams.push(`filter=${encodeURIComponent(filter)}`);
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    const { data } = await axios.get(`${BASE_URL}/${store?._id}/getProducts${queryString}`);

    return data?.data;
  };

  const {
    data: products,
    loading,
    hasMore,
    loaderRef,
    refresh,
  } = useInfiniteScroll({ apiFn: handleGetProducts, limit: 6, dependencies: [filter] });


  return (
    <>
      <div className="w-full p-6">
        <div className="flex justify-between">

          <h1 className=' text-[35px] text-[var(--tmp-txt)] font-semibold text-center'>Products</h1>
          <div className="w-max">
            <DropDown
              defaultOptions={[
                { label: 'Price High to Low', value: 'highToLow' },
                { label: 'Price Low to High', value: 'lowToHigh' },
                { label: 'Top Rated', value: 'topRated' },
                { label: 'In Stock', value: 'inStock' },
              ]}
              selectedOption={filter}
              setSelectedOption={setFilter}
              placeholder="Sort By:"
              layout={'label'}
              label="Sort By:"
              required={false}
              className="w-[260px]"
            />
          </div>
        </div>

        <div>
          {products?.length > 0 ? (
            <div className="grid grid-cols-4 max-[1024px]:grid-cols-3 max-[750px]:grid-cols-2 max-[470px]:grid-cols-2 mt-4 gap-2">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

            </div>
          ) : (
            <div className="text-center py-4">No products found</div>
          )}
        </div>

        {loading && (
          <div className="text-center text-sm text-gray-500 py-4">Loading more products...</div>
        )}
        {!hasMore && !loading && products.length > 0 && (
          <div className="text-center text-sm text-gray-400 py-4">No more products</div>
        )}
        <div ref={loaderRef} className="h-10 " />
      </div>

    </>
  );
};

export default Products;
