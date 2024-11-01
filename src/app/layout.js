"use client";

import "./globals.css";
import ProviderWrap from "@/components/ProviderWrap";
import { store } from "@/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Provider store={store}>
          <ProviderWrap children={children} />
          <ToastContainer/>
        </Provider>
      </body>
    </html>
  );
}
