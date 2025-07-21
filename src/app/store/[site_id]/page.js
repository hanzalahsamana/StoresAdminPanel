'use client';

import { useParams } from 'next/navigation';
import HomeLayout from '@/components/Layout/HomeLayout';
import { usePageData } from '@/Hooks/usePageData';
import { useSelector } from 'react-redux';
import NotFound from '@/components/404Pages/NotFound';

export default function DynamicPage() {
  const { store } = useSelector((state) => state.store);
  const { data, isLoading, error } = usePageData(store?._id, '/');


  if (isLoading) return <div>Loading...</div>;
  if (error) return <NotFound/>;

  return <HomeLayout homePageData={data?.sections} />;
}
