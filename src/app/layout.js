"use client";

import "../Styles/globals.css";
import ProviderWrap from "@/components/ProviderWrap";
import { store } from "@/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
// import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import NetworkStatus from "@/components/TemplateComponents/sections/NetworkError";
import { Tooltip } from "react-tooltip";

// const geistSans = localFont({
//   src: "../assets/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",x  
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../assets/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Web Nest</title>
      </head>
      <body className={` antialiased`} suppressHydrationWarning>
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
