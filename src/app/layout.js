"use client";

import "../Styles/globals.css";
import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import ProviderWrap from "@/components/Layout/ProviderWrap";
import { store } from "@/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import NetworkStatus from "@/components/UI/NetworkError";
import { Tooltip } from "react-tooltip";
import { Assistant } from "next/font/google";
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
        className={` antialiased ${assistant.className} `}
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
