import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useSwrFetch = (apiURL, condition = true) => {
  const shouldFetch = !!apiURL && condition;

  const { data, error, isLoading } = useSWR(shouldFetch ? apiURL : null, fetcher, {
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    error,
  };
};
