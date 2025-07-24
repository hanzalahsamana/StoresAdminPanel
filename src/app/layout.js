"use client";

import "../Styles/globals.css";
import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import ProviderWrap from "@/components/Layout/ProviderWrap";
import { store } from "@/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { Assistant } from "next/font/google";
import NoInternetBar from "@/components/404Pages/NoInternetBar";
const assistant = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add the font weights you need
});

export default function RootLayout({ children }) {
  // Run only once when the component mounts

  

  
  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Web Nest</title>
      </head>
      <body
        className={`${assistant.className} antialiased`}
        suppressHydrationWarning
      >
        <Provider store={store}>
          <ProviderWrap>{children}</ProviderWrap>
          <ToastContainer />
          <Tooltip className="!text-[12px]" id="my-tooltip" />
          <NoInternetBar />
        </Provider>
      </body>
    </html>
  );
}
