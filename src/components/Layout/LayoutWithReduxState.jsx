"use client";

import React, { useEffect } from 'react'
import Loader from '@/components/Loader/loader';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPagesData } from '@/APIs/PagesData/getPagesData';
import { fetchProducts } from '@/APIs/Product/getProductData';
import { fetchCategory } from '@/APIs/Category/getCategory';
import { setCartData } from '@/Redux/CartData/cartDataSlice';
import { fetchOrderData } from '@/APIs/Order/getOrderData';
import TemplateHeader from './TemplateHeader';
import TemplateFooter from './TemplateFooter';

const LayoutWithReduxState = ({ children }) => {

  const dispatch = useDispatch();

  const { siteName } = useSelector((state) => state.siteName);
  const { productLoading } = useSelector((state) => state.productData);
  const { pagesDataLoading } = useSelector((state) => state.pagesData);
  const { categoryLoading } = useSelector((state) => state.categories);



  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts(dispatch, siteName);
      await fetchPagesData(dispatch, siteName);
      await fetchCategory(dispatch, siteName);
      await fetchOrderData(dispatch, siteName);



      if (typeof window !== "undefined" && siteName) {
        const cartId = localStorage.getItem(`${siteName}_cartId`);
        console.log("okk2", cartId, siteName);
        dispatch(setCartData({ cartId, siteName }));
      }
    };

    if (siteName) {
      fetchData();
      console.log("ye bhi chala");

    }

  }, [dispatch, siteName]);



  if (productLoading || pagesDataLoading || categoryLoading) {
    console.log("yahi he");

    return <Loader />
  }

  return (
    <div className='flex flex-col items-center'>
      <TemplateHeader />
      {children}
      <TemplateFooter />
    </div>
  );
}

export default LayoutWithReduxState


