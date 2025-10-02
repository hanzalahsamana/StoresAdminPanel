'use client';
import { getCollections } from '@/APIs/Collection/getCollections';
import CollectionCard from '@/components/Cards/collectionCard';
import StoreLayoutWrap from '@/components/Layout/StoreLayoutWrap';
import Loader from '@/components/Loader/loader';
import CollectionSection from '@/components/Widgets/CollectionSection';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AllCollections = ({ params }) => {
  const { site_id, collectionLoading } = params;
  const { collections } = useSelector((state) => state.collection);
  const fetchCollections = async () => {
    await getCollections(site_id);
  };
  useEffect(() => {
    fetchCollections();
  }, [site_id]);

  if (collectionLoading) {
    return <Loader />;
  }
  return (
    <StoreLayoutWrap>
      <div className="w-full p-2 md:p-6 bg-[var(--tmp-pri)]">
        <h1 className="mt-2 md:text-[30px] text-[var(--tmp-txt)] font-semibold text-start">{'All Collections'}</h1>
        <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-5">
          {collections?.map((Collection, index) => (
            <CollectionCard key={index} collection={Collection} />
          ))}
        </div>
        {/* <CollectionSection sectionData={{ collections: collections, heading: 'All Collections' }} toShowLink={false} /> */}
      </div>
    </StoreLayoutWrap>
  );
};

export default AllCollections;
