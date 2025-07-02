import { useEffect, useState, useRef } from 'react';

export const useInfiniteScroll = ({ apiFn, limit = 10, initialPage = 1, dependencies = [] }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await apiFn(page, limit);
      const items = Array.isArray(result) ? result : result.data;

      if (!items?.length) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...items]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Infinite scroll error:', err);
    }
    setLoading(false);
  };

  // Initial fetch or when dependencies change
  useEffect(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
  }, [...dependencies]);

  useEffect(() => {
    fetchData();
  }, [page, ...dependencies]);

  // Intersection observer
  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    const el = loaderRef.current;
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [loaderRef.current, hasMore, loading]);

  return {
    data,
    loading,
    hasMore,
    loaderRef,
    refresh: () => {
      setData([]);
      setPage(initialPage);
      setHasMore(true);
    },
  };
};
