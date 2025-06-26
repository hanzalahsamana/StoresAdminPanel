"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useDispatch, useSelector } from "react-redux";
import { Assistant } from "next/font/google";

import TemplateHeader from "@/components/Layout/TemplateHeader";
import TemplateFooter from "@/components/Layout/TemplateFooter";
import DiscountCountdownBar from "@/components/UI/DiscountCountdownBar";
import Loader from "@/components/Loader/TemplateLoader";

import { setCartData } from "@/Redux/CartData/cartDataSlice";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import { getStore } from "@/APIs/StoreDetails/getStore";
import { getProducts } from "@/APIs/Product/getProducts";
import { getCollections } from "@/APIs/Category/getCollections";
import { getSections } from "@/APIs/SectionsData/getSections";
import { getContents } from "@/APIs/PagesData/getContents";
import SiteNotFound from "@/components/404Pages/SiteNotFound";
import { getPublicStoreConfiguration } from "@/APIs/StoreConfigurations/configuration";
import { usePathname } from "next/navigation";

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function SiteLayout({ params, children }) {
  const dispatch = useDispatch();
  const { store, storeLoading } = useSelector((state) => state.store);
  const { productLoading } = useSelector((state) => state.productData);
  const { pagesDataLoading } = useSelector((state) => state.pagesData);
  const { sectionsDataLoading } = useSelector((state) => state.sectionsData);
  const { categoryLoading } = useSelector((state) => state.categories);
  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
  const pathname = usePathname();
  const isCheckoutPage = pathname.includes("/checkout");

  useEffect(() => {
    if (params?.site_id) {
      getStore(params.site_id);
    }
  }, [params?.site_id]);

  useEffect(() => {
    if (store?.storeName) {
      document.title = decodeURIComponent(store.storeName);
    }

    if (SiteLogo?.image) {
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = SiteLogo.image;
    }
  }, [store?.storeName, SiteLogo]);

  useEffect(() => {
    if (!store?._id) return;

    const fetchAllData = async () => {
      try {
        await Promise.all([
          getProducts(store._id),
          getCollections(store._id),
          getSections(store._id),
          getContents(store._id),
          getPublicStoreConfiguration(store?._id),
        ]);

        if (typeof window !== "undefined") {
          const cartId = localStorage.getItem(`${store._id}_cartId`);
          dispatch(setCartData({ cartId, storeId: store._id }));
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
    return <SiteNotFound />;
  }

  if (
    productLoading ||
    pagesDataLoading ||
    categoryLoading ||
    sectionsDataLoading
  ) {
    return <Loader />;
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

      <div
        className={`flex flex-col items-center ${assistant.className} antialiased`}
      >
        {/* <DiscountCountdownBar
          discount={{
            name: "NEWYEAR2025",
            discountType: "global",
            access: "all",
            amountType: "percent",
            amount: 25,
            isActive: true,
            expiryDate: "2027-10-09T09:49:00.000+00:00",
          }}
        /> */}
        {!isCheckoutPage && <TemplateHeader />}
        {children}
        {!isCheckoutPage && <TemplateFooter />}
      </div>
    </>
  );
}
