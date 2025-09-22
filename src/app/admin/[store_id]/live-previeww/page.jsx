"use client";

// pages/live-preview.jsx
import { useEffect, useState } from "react";
import "@/Styles/Globals.css"; // if needed
import HomeLayout from "@/components/Layout/HomeLayout";
import ProductDetailCard from "@/components/Cards/productDetailCard";

export default function LivePrevieww() {
  const [previewData, setPreviewData] = useState({});
  const [previewComponent, setPreviewContent] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null); // toggle single section mode

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === "UPDATE_PREVIEW") {
        const data = e.data.payload;
        setPreviewData(data?.formData || {});
        setPreviewContent(data?.previewComponent || null);
        setActiveSectionId(data?.activeSectionId || null);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    // Notify parent that iframe is ready to receive data
    window.parent.postMessage({ type: "IFRAME_READY" }, "*");
  }, []);

  const renderContent = () => {
    const updatedFormData = previewData;

    if (true) {
      return (
        <HomeLayout
          PageData={previewComponent}
          activeSectionId={activeSectionId}
        />
      );
    } else if (previewComponent?.component === 'ProductDetailCard') {
      <ProductDetailCard product={updatedFormData} />
    }
  }

  return (
    <div className="">
      {/* <TemplateHeader /> */}
      {renderContent()}
      {/* <TemplateFooter /> */}
    </div>
  );
}
