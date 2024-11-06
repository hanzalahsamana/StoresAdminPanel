"use client";
import { fetchOrderData } from "@/APIs/Order/getOrderData";
import { fetchProducts } from "@/APIs/Product/getProductData";
import { setCurrentUser, setLoading } from "@/Redux/Authentication/AuthSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProviderWrap = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    fetchOrderData(dispatch,user?.brandName)
    fetchProducts(dispatch,user?.brandName)
    dispatch(setCurrentUser(user));
    dispatch(setLoading())
  }, [dispatch]);
  return <>{children}</>;
};

export default ProviderWrap;
