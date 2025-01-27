"use client";

import React, { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import { useDispatch, useSelector } from 'react-redux'
import { setCartData } from '@/Redux/CartData/cartDataSlice'
import { fetchPagesData } from '@/APIs/PagesData/getPagesData';
import { fetchProducts } from '@/APIs/Product/getProductData';
import { fetchCategory } from '@/APIs/Category/getCategory';
import Loader from '@/components/loader';

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
    };
    fetchData();
    if (typeof window !== "undefined") {
      dispatch(setCartData(localStorage.getItem('cartId')))
    }
  }, [dispatch])

  if (productLoading || pagesDataLoading || categoryLoading) {
    return <Loader />
  }

  return (
    <div className='flex flex-col items-center'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutWithReduxState


