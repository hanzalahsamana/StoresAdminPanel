"use client";

import "../Styles/globals.css";
import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import ProviderWrap from "@/components/Layout/ProviderWrap";
import { store } from "@/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { Assistant } from "next/font/google";
import NoInternetBar from "@/components/404Pages/NoInternetBar";

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Web Nest</title>
      </head>
      <body className={`${assistant.className} antialiased`} suppressHydrationWarning>
        <GoogleOAuthProvider  clientId="768678819185-u3r6o5avan9msgiesmbk9l9mcihr3vfv.apps.googleusercontent.com">
          <Provider store={store}>
            <ProviderWrap>{children}</ProviderWrap>
            <ToastContainer />
            <Tooltip className="!text-[12px]" id="my-tooltip" />
            <NoInternetBar />
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
