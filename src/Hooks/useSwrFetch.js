import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useSwrFetch = (apiURL, condition = true) => {
  const shouldFetch = !!apiURL && condition;

  const { data, error, isLoading } = useSWR(shouldFetch ? apiURL : null, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false, // ❌ No refetch when tab is focused
    revalidateIfStale: false, // ❌ No refetch when data is considered stale
    revalidateOnReconnect: false, // ❌ No refetch when reconnecting
  });

  return {
    data,
    isLoading,
    error,
  };
};
