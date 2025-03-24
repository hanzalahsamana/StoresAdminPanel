"use client";

import React, { useEffect } from 'react'
import { Assistant } from "next/font/google";

import Loader from '@/components/Loader/loader';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPagesData } from '@/APIs/PagesData/getPagesData';
import { fetchProducts } from '@/APIs/Product/getProductData';
import { fetchCategory } from '@/APIs/Category/getCategory';
import { setCartData } from '@/Redux/CartData/cartDataSlice';
import { fetchOrderData } from '@/APIs/Order/getOrderData';
import TemplateHeader from './TemplateHeader';
import TemplateFooter from './TemplateFooter';
import { fetchSectionsData } from '@/APIs/SectionsData/getSectonsData';
const assistant = Assistant({
  subsets: ["latin"],
  weight: ["400","500", "700"], // Add the font weights you need
});
const LayoutWithReduxState = ({ children }) => {

  const dispatch = useDispatch();

  const { siteName } = useSelector((state) => state.siteName);
  const { productLoading } = useSelector((state) => state.productData);
  const { pagesDataLoading } = useSelector((state) => state.pagesData);
  const { sectionDataLoading } = useSelector((state) => state.categories);
  const { categoryLoading } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.orderData);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts(dispatch, siteName);
      await fetchPagesData(dispatch, siteName);
      await fetchCategory(dispatch, siteName);
      await fetchOrderData(dispatch, siteName);
      await fetchSectionsData(dispatch, siteName);

      if (typeof window !== "undefined" && siteName) {
        const cartId = localStorage.getItem(`${siteName}_cartId`);
        dispatch(setCartData({ cartId, siteName }));
      }
    };

    if (siteName) {
      fetchData();
    }

  }, [dispatch, siteName]);



  if (productLoading || pagesDataLoading || categoryLoading || sectionDataLoading || loading) {
    return <Loader />
  }

  return (
    <div className={`flex flex-col items-center ${assistant.className}`}>
      <TemplateHeader />
      {children}
      <TemplateFooter />
    </div>
  );
}

export default LayoutWithReduxState


