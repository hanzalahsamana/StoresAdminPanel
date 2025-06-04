"use client";

import { useEffect } from "react";

import { setSiteName } from "@/Redux/SiteName/SiteNameSlice";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Script from "next/script";
import Loader from "@/components/Loader/TemplateLoader";
import LayoutWithReduxState from "@/components/Layout/LayoutWithReduxState";
import { getStore } from "@/APIs/StoreDetails/getStore";

export default function SiteLayout({ params, children }) {
  const { store, storeLoading } = useSelector((state) => state.store);
  const { siteName } = useSelector((state) => state.siteName);
  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (params?.site_id) {
      getStore(params?.site_id);
    }
  }, [params?.site_id]);

  useEffect(() => {
    if (siteName) {
      document.title = decodeURIComponent(siteName);
    }
    if (SiteLogo) {
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        console.log("hello", SiteLogo);
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = SiteLogo?.image;
    }
  }, [siteName, SiteLogo]);

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

        if (typeof window !== "undefined" && siteName) {
          const cartId = localStorage.getItem(`${siteName}_cartId`);
          dispatch(setCartData({ cartId, siteName }));
        }
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchAllData();
  }, [store?._id, dispatch]);

  if (storeLoading) {
    return <Loader />;
  }

  if (!store?._id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Store not found</h1>
      </div>
    );
  }

  return (
    <>
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

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5MLLMDZ7"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <LayoutWithReduxState params={params}>{children}</LayoutWithReduxState>
    </>
  );
}
