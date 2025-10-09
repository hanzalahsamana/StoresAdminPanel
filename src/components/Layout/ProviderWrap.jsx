'use client';

import { getUserFromToken } from '@/APIs/Auth/getUserFromToken';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from '@/Redux/CartData/cartDataSlice';
import { getStore } from '@/APIs/StoreDetails/getStore';
import { getAdminStoreConfiguration, getPublicStoreConfiguration } from '@/APIs/StoreConfigurations/configuration';
import { setStore } from '@/Redux/Store/StoreDetail.slice';
import SiteNotFound from '@/components/404Pages/SiteNotFound';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import { getAllStores } from '@/APIs/StoreDetails/getAllStores';
import { applyTheme, getFontClass } from '@/Utils/ApplyTheme';
import DiscountPopup from '../UI/DiscountPopup';

// This is for Only Redux Access
const ReduxProviderWrap = ({ children }) => {
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    getUserFromToken(userToken);
  }, []);

  return children;
};

export const StoreProviderWrap = ({ params, children }) => {
  const dispatch = useDispatch();
  const { store, storeLoading } = useSelector((state) => state.store);
  const [fontClass, setFontClass] = useState('');
  const { announcements } = useSelector((state) => state.storeConfiguration.storeConfiguration);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !announcements) return;
    const visited = JSON.parse(localStorage.getItem('popupFirstVisit')) || false;
    if (announcements?.popup?.showType === 'firstVisit' && !visited) {
      setIsOpen(true);
      localStorage.setItem('popupFirstVisit', JSON.stringify(true));
    } else if (announcements?.popup?.showType === 'reload') {
      localStorage.removeItem('popupFirstVisit');
      setIsOpen(true);
    }
  }, [announcements]);

  useEffect(() => {
    if (params?.site_id) {
      dispatch(setStore({ _id: params.site_id }));
      getStore(params.site_id);
    }
  }, [params?.site_id]);

  // useEffect(() => {
  //   if (store?.storeName) {
  //     document.title = decodeURIComponent(store.storeName);
  //   }

  //   if (SiteLogo?.image) {
  //     let link = document.querySelector("link[rel='icon']");
  //     if (!link) {
  //       link = document.createElement('link');
  //       link.rel = 'icon';
  //       document.head.appendChild(link);
  //     }
  //     link.href = SiteLogo.image;
  //   }
  // }, [store?.storeName, SiteLogo]);

  useEffect(() => {
    if (!store?.branding) return;

    const { theme, font, favicon } = store.branding;
    const { storeName } = store;

    applyTheme(theme);
    setFontClass(getFontClass(font));
  }, [store?.branding]);

  useEffect(() => {
    if (!store?._id) return;

    const fetchAllData = async () => {
      try {
        await Promise.all([getPublicStoreConfiguration(store?._id)]);
        if (typeof window !== 'undefined') {
          const cartId = localStorage.getItem(`${store._id}_cartId`);
          dispatch(setCartData({ cartId, storeId: store._id }));
        }
      } catch (error) {
        console.error('Data fetching failed:', error);
      }
    };

    fetchAllData();
  }, [store?._id, dispatch]);

  if (!store?._id && !storeLoading) {
    return <SiteNotFound />;
  }

  return (
    <>
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5MLLMDZ7" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5MLLMDZ7');
          `,
        }}
      />
      <div>
        <div className={`flex flex-col items-center ${fontClass} antialiased`}>{children}</div>
        {announcements?.popup?.isActive && isOpen && <DiscountPopup isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </>
  );
};

export const AdminProviderWrap = ({ children }) => {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currUser?.token) return;
    getAllStores(currUser?.token);
  }, [currUser?.token]);

  useEffect(() => {
    if (!store?._id) return;

    const fetchAllData = async () => {
      try {
        await Promise.all([getAdminStoreConfiguration(currUser?.token, store?._id)]);
      } catch (error) {
        console.error('Data fetching failed:', error);
      }
    };

    fetchAllData();
  }, [store?._id, dispatch]);
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ReduxProviderWrap;
