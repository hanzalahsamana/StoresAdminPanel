"use client";

import NotFound from "@/components/404Pages/NotFound";
import PageStructureGenrator from "@/components/Layout/PageStructureGenrator";
import BlurLoader from "@/components/Loader/BlurLoader";
import { useSwrFetch } from "@/Hooks/useSwrFetch";
import BASE_URL from "config";
import { useSelector } from "react-redux";

const Products = () => {
  const { store, storeLoading } = useSelector((state) => state.store);

  const { data, isLoading, error } = useSwrFetch(`${BASE_URL}/${store?._id}/getPublishPage?slug=/products`);

  // if (isLoading || storeLoading) return <div>Loading...</div>;
  if (error) return <NotFound />;

  return (
    <>
      <BlurLoader isVisible={isLoading || storeLoading} />
      <PageStructureGenrator PageData={data?.data} />
    </>
  );
};

export default Products;
