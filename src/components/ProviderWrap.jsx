"use client";
import { fetchCategory } from "@/APIs/Category/getCategory";
import { fetchOrderData } from "@/APIs/Order/getOrderData";
import { fetchPagesData } from "@/APIs/PagesData/getPagesData";
import { fetchProducts } from "@/APIs/Product/getProductData";
import { setCurrentUser, setLoading } from "@/Redux/Authentication/AuthSlice";
import { setSiteName } from "@/Redux/SiteName/SiteNameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProviderWrap = ({ children }) => {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    dispatch(setCurrentUser(user));
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (currUser) {
      dispatch(setSiteName(currUser?.brandName))
      fetchOrderData(dispatch, currUser?.brandName);
      fetchProducts(dispatch, currUser?.brandName);
      fetchCategory(dispatch, currUser?.brandName);
      console.log("woww");
      
      fetchPagesData(dispatch, currUser?.brandName)


    }
  }, [currUser]);

  return <>{children}</>;
};

export default ProviderWrap;
