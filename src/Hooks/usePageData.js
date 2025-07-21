import useSWR from 'swr';
import axios from 'axios';
import BASE_URL from 'config';

const fetcher = url => axios.get(url).then(res => res.data.data);

export const usePageData = (storeId, slug) => {
  const shouldFetch = !!storeId && !!slug;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `${BASE_URL}/${storeId}/builder/getPublishPage?slug=${slug}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
};
