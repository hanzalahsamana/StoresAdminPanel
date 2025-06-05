"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader/TemplateLoader";
import { getStore } from "@/APIs/StoreDetails/getStore";
import { getSections } from "@/APIs/SectionsData/getSections";
import { getProducts } from "@/APIs/Product/getProducts";
import { getCollections } from "@/APIs/Category/getCollections";
import { getContents } from "@/APIs/PagesData/getContents";
import NotFound from "@/components/404Pages/NotFound";
import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";

export default function adminLayout({ children, params }) {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);
  const { store, storeLoading } = useSelector((state) => state.store);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    getStore(params?.store_id);
  }, [dispatch, params?.store_id]);

  useEffect(() => {
    if (!store?._id) return;

    const fetchAllData = async () => {
      try {
        await Promise.all([
          getProducts(store?._id),
          getCollections(store?._id),
          getSections(store?._id),
          getContents(store?._id),
          // fetchOrderData(dispatch, currUser.brandName),
        ]);
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchAllData();
  }, [store?._id, dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (storeLoading) {
    return <Loader />;
  }

  if (!store?._id || store?.userRef !== currUser?._id) {
    return <NotFound />;
  }

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="w-full flex justify-end">
        <Header toggleSidebar={toggleSidebar} />
        <div
          className={`${
            isSidebarOpen ? "lg:w-[calc(100%-230px)]" : "lg:w-full"
          } w-full mt-[60px] h-[100%] transition-all duration-200 ease-in-out overflow-scroll no-scrollbar bg-lbgC`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
