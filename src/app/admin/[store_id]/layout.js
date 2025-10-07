'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

import Loader from '@/components/Loader/TemplateLoader';
import { getStore } from '@/APIs/StoreDetails/getStore';
import { getSections } from '@/APIs/SectionsData/getSections';
import { getProducts } from '@/APIs/Product/getProducts';
import { getCollections } from '@/APIs/Collection/getCollections';
import { getContents } from '@/APIs/Content/getContents';
import NotFound from '@/components/404Pages/NotFound';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { getAdminStoreConfiguration } from '@/APIs/StoreConfigurations/configuration';
import { setIsSidebarOpen } from '@/Redux/LivePreview/livePreviewSlice';
import { Assistant } from 'next/font/google';
import { AdminPanelSideBarData } from '@/Structure/DefaultStructures';

const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function adminLayout({ children, params }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { currUser } = useSelector((state) => state.currentUser);
  const { store, storeLoading } = useSelector((state) => state.store);
  const { collectionLoading } = useSelector((state) => state.collection);
  const { isSidebarOpen } = useSelector((state) => state.livePreview);

  // ❌ Exclude layout on these pages
  const excludedPaths = ['/profile', '/live-previeww', '/customize'];
  const shouldExcludeLayout = excludedPaths.some((path) => pathname?.includes(path));

  // Load store
  useEffect(() => {
    getStore(params?.store_id);
  }, [dispatch, params?.store_id]);

  // Fetch all required data once store is ready
  useEffect(() => {
    if (!store?._id) return;

    const fetchAllData = async () => {
      try {
        await Promise.all([
          // getProducts(store?._id),
          // getCollections(store?._id),
          getSections(store?._id),
          // getContents(store?._id),
          // getAdminStoreConfiguration(currUser?.token, store?._id),
        ]);
      } catch (error) {
        console.error('Data fetching failed:', error);
      }
    };

    fetchAllData();
  }, [store?._id, dispatch]);

  const toggleSidebar = () => dispatch(setIsSidebarOpen(!isSidebarOpen));

  if (shouldExcludeLayout) {
    return <>{children}</>; // ✅ Skip layout
  }

  if (storeLoading) return <Loader />;

  if (!store?._id || store?.userRef !== currUser?._id) {
    return <NotFound />;
  }
  console.log('isSidebarOpen', isSidebarOpen);

  return (
    <div className={`flex h-[calc(100vh-60px)]  ${assistant.className} antialiased`}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={(state) => dispatch(setIsSidebarOpen(state))} sideBarData={AdminPanelSideBarData} />
      <div className="w-full flex justify-end">
        <Header toggleSidebar={toggleSidebar} />
        <div
          className={`${
            isSidebarOpen ? 'lg:w-[calc(100%-230px)]' : 'lg:w-full'
          } w-full mt-[60px] h-[100%] transition-all duration-200 ease-in-out overflow-scroll no-scrollbar bg-lbgC`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
