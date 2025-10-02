'use client';
import ProductsSection from '@/components/Widgets/ProductsSection';
import Loader from '@/components/Loader/TemplateLoader';
import React, { useEffect, useState } from 'react';
import StoreLayoutWrap from '@/components/Layout/StoreLayoutWrap';
import { getSingleCollection } from '@/APIs/Collection/getSingleCollection';

const Collection = ({ params }) => {
  const { site_id, collection } = params;
  const [loading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState({});

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const fetchSingleCollection = async () => {
    const singleCollection = await getSingleCollection(site_id, { collectionSlug: collection });
    setCollectionData(singleCollection);
    setLoading(false);
  };
  useEffect(() => {
    fetchSingleCollection();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <StoreLayoutWrap>
      <ProductsSection sectionData={{ products: collectionData?.products, heading: collectionData?.name || '' }} />
    </StoreLayoutWrap>
  );
};

export default Collection;
