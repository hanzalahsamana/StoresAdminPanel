"use client";

import { useEffect, useState } from "react";
import { ReactNode } from "react";
import Head from "next/head";
import Script from "next/script";
import LayoutWithReduxState from "@/components/TemplateComponents/layout/layoutWithReduxState";
import { setSiteName } from "@/Redux/SiteName/SiteNameSlice";
import Loader from "@/components/TemplateComponents/UI/loader";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SiteLayout({ params, children }) {
  const { siteName } = useSelector((state) => state.siteName);
  const dispatch = useDispatch();

  // const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));

  useEffect(() => {
    if (params?.site_id) {
      dispatch(setSiteName(params.site_id));
    }
  }, [dispatch, params?.site_id]);

  // useEffect(() => {
  //   const fetchSiteData = async () => {
  //     const result = await readSiteById(params?.site_id);

  //     if (!result) {
  //       console.log("okh", result);
  //     }

  //     setSiteData(result);
  //   };

  //   fetchSiteData();
  // }, [params?.site_id]);

  useEffect(() => {
    if (siteName) {
      document.title = siteName;
    }
    // if (siteLogo) {
    //   let link = document.querySelector("link[rel='icon']");
    //   if (!link) {
    //     link = document.createElement("link");
    //     link.rel = "icon";
    //     document.head.appendChild(link);
    //   }
    //   link.href = siteLogo;
    // }
  }, [siteName]);

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

      {/* <NavBar
          title={site_name}
          description={site_description}
          logo={site_logo}
        /> */}
      <LayoutWithReduxState params={params}>{children}</LayoutWithReduxState>
    </>
  );
}
