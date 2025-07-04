import { useEffect, useState, useRef } from 'react';

export const useInfiniteScroll = ({ apiFn, limit = 10, initialPage = 1, dependencies = [] }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchData = async (pageToFetch = page) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await apiFn(pageToFetch, limit);
      const items = Array.isArray(result) ? result : result.data;

      if (!items?.length) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...items]);
        setPage((prev) => prev + 1); // prepare for next page
      }
    } catch (err) {
      console.error('Infinite scroll error:', err);
    }
    setLoading(false);
  };

  // When dependencies change, reset everything and load the first page
  useEffect(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);

    // Immediately fetch first page
    fetchData(initialPage);
  }, [...dependencies]);

  // Intersection observer to fetch next pages on scroll
  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData(page); // fetch next page only on scroll
      }
    });

    const el = loaderRef.current;
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [loaderRef.current, hasMore, loading, page]);

  return {
    data,
    loading,
    hasMore,
    loaderRef,
    refresh: () => {
      setData([]);
      setPage(initialPage);
      setHasMore(true);
      fetchData(initialPage);
    },
  };
};
