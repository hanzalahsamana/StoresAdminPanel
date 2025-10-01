'use client';

import { useSwrFetch } from '@/Hooks/useSwrFetch';
import BASE_URL from 'config';
import { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import NotFound from '../404Pages/NotFound';
import FilterBar from '../Blocks/FilterBar';
import ProductCard from '../Cards/productCard';
import ProductCardLoader from '../Loader/ProductCardLoader';
import Pagination from '../Blocks/Pagination';
import { VscSettings } from 'react-icons/vsc';
import { useSearchParams, useRouter } from 'next/navigation';
import BlurLoader from '../Loader/BlurLoader';
import Button from '../Actions/Button';

const Catalog = forwardRef(({ sectionData = {}, ...rest }, ref) => {
  const { heading, description, standardFilters, variantsFilters, availableVariants = [], minPrice = 0, maxPrice = 1000, layout } = sectionData;

  const { store, storeLoading } = useSelector((state) => state.store);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);

  // Build query parameters from URL
  const params = new URLSearchParams(searchParams.toString());

  const page = params.get('page') || 1;
  const sortBy = params.get('sort') || '';
  const limit = 15;

  const priceMin = params.get('minPrice');
  const priceMax = params.get('maxPrice');

  // Collect all variant filters from availableVariants
  const variantQueryParams = availableVariants.reduce((acc, variant) => {
    const key = variant.name.toLowerCase();
    const value = params.get(key);
    if (value) {
      acc[key] = value; // comma separated
    }
    return acc;
  }, {});

  // Build query string for API
  let queryParts = [`page=${page}`, `limit=15`];

  if (sortBy) queryParts.push(`sortBy=${encodeURIComponent(sortBy)}`);
  if (priceMin) queryParts.push(`minPrice=${priceMin}`);
  if (priceMax) queryParts.push(`maxPrice=${priceMax}`);

  // Add variant filters to query
  Object.entries(variantQueryParams).forEach(([key, value]) => {
    queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  const queryString = `?${queryParts.join('&')}`;

  const { data, isLoading, error } = useSwrFetch(`${BASE_URL}/${store?._id}/getProducts${queryString}`);

  if (error) return <NotFound />;

  return (
    <div ref={ref} {...rest} className="flex justify-center items-center w-full bg-[var(--tmp-pri)]">
      <BlurLoader isVisible={isLoading} />;
      <div className="flex flex-col gap-5 w-full p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[35px] text-[var(--tmp-txt)] font-semibold text-center">{heading || 'Catalog'}</h1>
          <div className="flex items-center gap-4">
            {(variantsFilters || standardFilters) && (
              <>
                <FilterBar
                  isOpen={isFilterBarOpen}
                  setIsOpen={setIsFilterBarOpen}
                  standardFilters={standardFilters}
                  variantsFilters={variantsFilters}
                  availableVariants={availableVariants}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  OnApplyFilter={() => setIsFilterBarOpen(false)}
                />
                <Button
                  icon={<VscSettings className="text-lg" />}
                  action={() => setIsFilterBarOpen(!isFilterBarOpen)}
                  label="Filters"
                  variant="store"
                  className="!text-[var(--tmp-ltxt)] !bg-transparent border border-[var(--tmp-lBor)] font-bold !w-max !px-4 flex !items-center"
                  size=""
                />
              </>
            )}
          </div>
        </div>

        {description && <p className="flex-1 text-[var(--tmp-txt)]" dangerouslySetInnerHTML={{ __html: description }}></p>}

        <div className="grid grid-cols-4 gap-3">
          {!isLoading ? (
            data?.data?.length > 0 && data?.data.map((product, index) => <ProductCard key={index} product={product} />)
          ) : (
            <>
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
            </>
          )}
        </div>

        <Pagination
          currentPage={parseInt(page)}
          totalPages={Math.ceil(data?.totalData / limit)}
          onPageChange={(newPage) => {
            params.set('page', newPage.toString());
            router.push(`?${params.toString()}`);
          }}
        />
      </div>
    </div>
  );
});

export default Catalog;
