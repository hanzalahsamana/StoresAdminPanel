"use client";

// pages/live-preview.jsx
import { useEffect, useState } from "react";
import HomeLayout from "@/components/Layout/HomeLayout";
import ProductDetailCard from "@/components/Cards/productDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { setStoreBranding } from "@/Redux/Store/StoreDetail.slice";
import { applyLocalTheme, getFontClass } from "@/Utils/ApplyTheme";

export default function LivePrevieww() {
  const [previewComponent, setPreviewContent] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null); // toggle single section mode
  const { store } = useSelector((state) => state.store);

  console.log(store?.branding, "Ye Preview Se Chala");

  const dispatch = useDispatch()

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === "UPDATE_PREVIEW") {
        const data = e.data.payload;
        setPreviewContent(data?.previewComponent || null);
        setActiveSectionId(data?.activeSectionId || null);
        if (data?.branding && Object.keys(data?.branding)?.length > 0) {
          dispatch(setStoreBranding(data?.branding))
          if (data.branding?.theme) {
            applyLocalTheme(data.branding?.theme);
          }

        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    window.parent.postMessage({ type: "IFRAME_READY" }, "*");
  }, []);

  return (
    <div className={`${getFontClass(store?.branding?.font)} page-theme-wrapper`}>
      <HomeLayout
        PageData={previewComponent}
        activeSectionId={activeSectionId}
      />
    </div>
  );
}
