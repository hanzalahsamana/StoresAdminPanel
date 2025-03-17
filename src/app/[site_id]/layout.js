"use client";

import { useEffect } from "react";
import { setSiteName } from "@/Redux/SiteName/SiteNameSlice";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Script from "next/script";
import Loader from "@/components/Loader/TemplateLoader";
import LayoutWithReduxState from "@/components/Layout/LayoutWithReduxState";

export default function SiteLayout({ params, children }) {
  const { siteName } = useSelector((state) => state.siteName);
  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (params?.site_id) {
      dispatch(setSiteName(params.site_id));
    }
  }, [dispatch, params?.site_id]);

  useEffect(() => {
    if (siteName) {
      document.title = decodeURIComponent(siteName);
    }
    if (SiteLogo) {
      
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        console.log("hello" , SiteLogo);
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = SiteLogo?.image;
    }
  }, [siteName , SiteLogo]);

  if (!siteName) {
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
      <LayoutWithReduxState params={params}>{children}</LayoutWithReduxState>
    </>
  );
}
