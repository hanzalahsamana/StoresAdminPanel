"use client";

import { getProducts } from "@/APIs/Product/getProducts";
import NotFound from "@/components/404Pages/NotFound";
import Button from "@/components/Actions/Button";
import DropDown from "@/components/Actions/DropDown";
import CustomRangeSlider from "@/components/Actions/PriceRangeSlider";
import PriceRangeSlider from "@/components/Actions/PriceRangeSlider";
import FilterBar from "@/components/Blocks/FilterBar";
import Pagination from "@/components/Blocks/Pagination";
import ProductCard from "@/components/Cards/productCard";
import TemplateHeader from "@/components/Layout/TemplateHeader";
import ProductCardLoader from "@/components/Loader/ProductCardLoader";
import ProductsSection from "@/components/Widgets/productsSection";
import { useInfiniteScroll } from "@/Hooks/useInfiniteScroll";
import { useSwrFetch } from "@/Hooks/useSwrFetch";
import BASE_URL from "config";
import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";

const Products = () => {
  const { store } = useSelector((state) => state.store);
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState('')

  // const { products } = useSelector((state) => state.productData);


  // const handleGetProducts = async (page, limit) => {
  //   const { data } = await axios.get(`${BASE_URL}/${store?._id}/getProducts${queryString}`);

  //   return data?.data;
  // };
  let queryParams = [];
  if (page !== undefined && page !== null) queryParams.push(`page=${page}`);
  queryParams.push(`limit=${5}`);
  if (filter !== undefined && filter !== null && filter !== '') queryParams.push(`filter=${encodeURIComponent(filter)}`);
  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';


  const { data, isLoading, error } = useSwrFetch(`${BASE_URL}/${store?._id}/getProducts${queryString}`);
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <NotFound />;


  return (
    <div className="flex justify-center items-center w-full">
      <FilterBar/>

      <div className="flex flex-col gap-5 w-full p-6">
        <div className="flex justify-start items-end">

          <h1 className=' text-[45px] text-[var(--tmp-txt)] font-semibold text-center'>Catalog</h1>
          {/* <div className="w-max">
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
          </div> */}
        </div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, tenetur. Libero exercitationem blanditiis, aliquid dolorem accusamus natus perferendis non sequi expedita officiis incidunt corporis temporibus et excepturi iure, perspiciatis reprehenderit.</p>

        <div className="grid grid-cols-3 gap-3">

          {!data?.length > 0 ? data?.map((product, index) => {

            return (
              <ProductCard key={index} product={product} />
            )
          }) : (
            <>
            
              <ProductCardLoader />
              <ProductCardLoader />
              <ProductCardLoader />
              <ProductCardLoader />
              <ProductCardLoader />
              <ProductCardLoader />
              {/* <ProductCardLoader /> */}
            </>
          )}
          
          {/* <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader /> */}
        </div>

        <Pagination currentPage={page} onPageChange={(page) => setPage(page)} />

      </div>



    </div>
  );
};

export default Products;
