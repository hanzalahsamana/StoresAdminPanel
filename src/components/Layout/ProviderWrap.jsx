"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { getUserFromToken } from "@/APIs/Auth/getUserFromToken";
import { fetchOrderData } from "@/APIs/Order/getOrderData";
import { fetchProducts } from "@/APIs/Product/getProductData";
import { fetchCategory } from "@/APIs/Category/getCategory";
import { fetchPagesData } from "@/APIs/PagesData/getPagesData";
import { fetchSectionsData } from "@/APIs/SectionsData/getSectonsData";

import { setSiteName } from "@/Redux/SiteName/SiteNameSlice";
import { applyTheme } from "@/Utils/ApplyTheme";
import Loader from "../Loader/loader";
import { fetchStoreDetails } from "@/APIs/StoreDetails/fetchStoreDetails";

const ProviderWrap = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currUser } = useSelector((state) => state.currentUser);
  const { productLoading } = useSelector((state) => state.productData);
  const { pagesDataLoading } = useSelector((state) => state.pagesData);
  const { sectionDataLoading } = useSelector((state) => state.sectionsData);
  const { categoryLoading } = useSelector((state) => state.categories);
  const { storeDetail, storeDetailLoading } = useSelector((state) => state?.storeDetail);
  const { theme } = storeDetail;

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    getUserFromToken(dispatch, userToken);
  }, [dispatch]);

  useEffect(() => {
    if (theme) applyTheme(theme);
  }, [theme, router]);


  useEffect(() => {
    if (!currUser?.brandName) return;

    dispatch(setSiteName(currUser.brandName));

    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchOrderData(dispatch, currUser.brandName),
          fetchProducts(dispatch, currUser.brandName),
          fetchCategory(dispatch, currUser.brandName),
          fetchPagesData(dispatch, currUser.brandName),
          fetchSectionsData(dispatch, currUser.brandName),
          fetchStoreDetails(dispatch, currUser.brandName),
        ]);
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchAllData();
  }, [currUser?.brandName, dispatch]);

  const isLoading =
    currUser &&
    (productLoading ||
      pagesDataLoading ||
      categoryLoading ||
      storeDetailLoading ||
      sectionDataLoading);

  if (isLoading) return <Loader />;

  return children;
};

export default ProviderWrap;

