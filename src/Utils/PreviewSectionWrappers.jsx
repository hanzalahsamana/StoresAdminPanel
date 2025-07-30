import CollectionSection from '@/components/Widgets/collectionSection';
import ProductsSection from '@/components/Widgets/productsSection';
import { useSwrFetch } from '@/Hooks/useSwrFetch';
import BASE_URL from 'config';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

export const FeatureProductSectionWrapper = forwardRef(({ sectionData = {}, ...rest }, ref) => {
  const { productCount = 4, productsToShow = 'all', selectedCollections = [] } = sectionData || {};
  const { store } = useSelector((state) => state.store);

  const query = new URLSearchParams();
  if (productsToShow === 'collections' && selectedCollections.length > 0) {
    const ids = selectedCollections.map((item) => item).join(',');
    query.append('collections', ids);
  }
  query.append('limit', productCount);
  query.append('page', 1);

  const apiURL = store?._id ? `${BASE_URL}/${store._id}/getProducts?${query.toString()}` : null;

  const { data: products = [], isLoading, error } = useSwrFetch(apiURL, !!store?._id);

  return <ProductsSection ref={ref} sectionData={{ ...sectionData, products, isLoading, error }} {...rest} />;
});

export const FeatureCollectionSectionWrapper = forwardRef(({ sectionData = {}, ...rest }, ref) => {

  const { collectionIds = [] } = sectionData || {};
  const { store } = useSelector((state) => state.store);

  const query = new URLSearchParams();
  if (collectionIds.length > 0) {
    const ids = collectionIds.map((item) => item).join(',');
    query.append('collectionIds', ids);
  }
  query.append('page', 1);

  const apiURL = store?._id ? `${BASE_URL}/${store._id}/getCollections?${query.toString()}` : null;

  const { data = [], isLoading, error } = useSwrFetch(apiURL, !!store?._id);

  return <CollectionSection ref={ref} sectionData={{ ...sectionData, collections: data, isLoading, error }} {...rest} />;
});