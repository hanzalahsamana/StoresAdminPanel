"use client";

import "../Styles/globals.css";
import ProviderWrap from "@/components/Layout/ProviderWrap";
import { store } from "@/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
// import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import NetworkStatus from "@/components/UI/NetworkError";
import { Tooltip } from "react-tooltip";
import { applyTheme } from "@/Utils/ApplyTheme";
import { useEffect } from "react";



export default function RootLayout({ children }) {
  // Run only once when the component mounts

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Web Nest</title>
      </head>
      <body
        className={` antialiased`}
        suppressHydrationWarning
      >
        <Provider store={store}>
          <ProviderWrap>{children}</ProviderWrap>
          <ToastContainer />
          <Tooltip className="!text-[12px]" id="my-tooltip" />
          <NetworkStatus />
        </Provider>
      </body>
    </html>
  );
}
