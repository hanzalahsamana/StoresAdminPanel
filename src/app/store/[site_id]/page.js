'use client';

import { useParams } from 'next/navigation';
import HomeLayout from '@/components/Layout/HomeLayout';
import { useSelector } from 'react-redux';
import NotFound from '@/components/404Pages/NotFound';
import PageStructureGenrator from '@/components/Layout/PageStructureGenrator';
import { useSwrFetch } from '@/Hooks/useSwrFetch';
import BASE_URL from 'config';

export default function DynamicPage() {
  const { store } = useSelector((state) => state.store);

  const { data, isLoading, error } = useSwrFetch(`${BASE_URL}/${store?._id}/getPublishPage?slug=/`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <NotFound />;

  return <PageStructureGenrator PageData={data} />;
}
