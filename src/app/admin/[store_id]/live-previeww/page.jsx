"use client";

// pages/live-preview.jsx
import { useEffect, useState } from "react";
import "@/styles/globals.css"; // if needed
import HomeLayout from "@/components/Layout/HomeLayout";
import { SectionStructure } from "@/Structure/SectionStructure";
import TemplateHeader from "@/components/Layout/TemplateHeader";
import TemplateFooter from "@/components/Layout/TemplateFooter";
import ProductDetailCard from "@/components/Cards/productDetailCard";

export default function LivePrevieww() {
  const [previewData, setPreviewData] = useState({});
  const [previewComponent, setPreviewContent] = useState(null);
  const [checked, setChecked] = useState(false); // toggle single section mode

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === "UPDATE_PREVIEW") {
        const data = e.data.payload;
        setPreviewData(data?.formData || {});
        setPreviewContent(data?.previewComponent || null);
        setChecked(data?.checked || false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const renderContent = () => {
    const updatedFormData = previewData;

    if (previewComponent?.component === 'section') {
      if (checked && previewComponent?.type && SectionStructure[previewComponent.type]) {
        const Component = SectionStructure[previewComponent.type].component;
        return <Component content={updatedFormData} />;
      } else {
        return (
          <HomeLayout
            overrideSectionId={previewComponent?._id}
            formData={updatedFormData}
          />
        );
      }
    } else if (previewComponent?.component === 'ProductDetailCard') {
      <ProductDetailCard product={updatedFormData} />
    }
  }

  return (
    <div className="">
      <TemplateHeader />
      {renderContent()}
      <TemplateFooter />
    </div>
  );
}
