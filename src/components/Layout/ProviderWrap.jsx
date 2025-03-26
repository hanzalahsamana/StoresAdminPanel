"use client";
import { getUserFromToken } from "@/APIs/Auth/getUserFromToken";
import { fetchCategory } from "@/APIs/Category/getCategory";
import { fetchOrderData } from "@/APIs/Order/getOrderData";
import { fetchPagesData } from "@/APIs/PagesData/getPagesData";
import { fetchProducts } from "@/APIs/Product/getProductData";
import { fetchSectionsData } from "@/APIs/SectionsData/getSectonsData";
import { setSiteName } from "@/Redux/SiteName/SiteNameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { applyTheme } from "@/Utils/ApplyTheme";

const ProviderWrap = ({ children }) => {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);
  const { productLoading } = useSelector((state) => state.productData);
  const { pagesDataLoading } = useSelector((state) => state.pagesData);
  const { sectionDataLoading } = useSelector((state) => state.sectionsData);
  const { categoryLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log(userToken);
    
    getUserFromToken(dispatch, userToken);
  }, [dispatch]);
  const theme = {
    primaryColor: "#06989a",
    secondaryColor: "#06a4a720",
    accentColor: "#ff5733",
    backgroundColor: "#ffffff",
    textColor: "#333939",
    borderColor: "#dcdee1",
    lightTextColor: "#5f6571",
  };

  useEffect(() => {
    applyTheme(theme);
  }, [dispatch]);

  useEffect(() => {
    if (!currUser) return;
    
    dispatch(setSiteName(currUser?.brandName));

    const fetchData = async () => {
      await Promise.all([
        fetchOrderData(dispatch, currUser?.brandName),
        fetchProducts(dispatch, currUser?.brandName),
        fetchCategory(dispatch, currUser?.brandName),
        fetchPagesData(dispatch, currUser?.brandName),
        fetchSectionsData(dispatch, currUser?.brandName)
      ]);
    };

    fetchData();
  }, [currUser, dispatch]);

  if ((productLoading || pagesDataLoading || categoryLoading || sectionDataLoading) && currUser) {
    return <Loader />;
  }

  return children;
};

export default ProviderWrap;
