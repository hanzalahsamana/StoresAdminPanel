'use client';

import NotFound from '@/components/404Pages/NotFound';
import PageStructureGenrator from '@/components/Layout/PageStructureGenrator';
import BlurLoader from '@/components/Loader/BlurLoader';
import { useSwrFetch } from '@/Hooks/useSwrFetch';
import BASE_URL from 'config';
import { useSelector } from 'react-redux';

export default function CustomPage({ params }) {
    const { store, storeLoading } = useSelector((state) => state.store);

    const pageSlug = params?.page_slug;

    const { data, isLoading, error } = useSwrFetch(`${BASE_URL}/${store?._id}/getPublishPage?slug=/pages/${pageSlug}`);

    if (error) return <NotFound />;

    return (
        <>
            <BlurLoader isVisible={isLoading || storeLoading} />
            <PageStructureGenrator PageData={data?.data} />
        </>
    );
}
