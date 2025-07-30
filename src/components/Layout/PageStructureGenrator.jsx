"use client";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Hero from "../Widgets/Hero";
import CollectionSection from "../Widgets/collectionSection";
import PromoWidget from "../Widgets/PromoWidget";
import ProductsSection from "../Widgets/productsSection";
import RichText from "../Widgets/RichText";
import BannerSlider from "../Widgets/BannerSlider";
import TemplateHeader from "./TemplateHeader";
import TemplateFooter from "./TemplateFooter";

export default function PageStructureGenrator({ PageData = [] }) {

  console.log(PageData, "⚔️⚔️");


  // useEffect(() => {
  //   if (
  //     activeSectionId &&
  //     activeSectionId !== lastScrolledTo.current &&
  //     sectionRefs.current[activeSectionId]
  //   ) {
  //     requestAnimationFrame(() => {
  //       sectionRefs.current[activeSectionId].scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //       lastScrolledTo.current = activeSectionId;
  //     });
  //   }
  // }, [activeSectionId]);

  const renderSection = (section) => {
    if (!section || !section.type) return null;

    const props = {
      sectionData: section.sectionData,
    };


    switch (section.type) {
      case "banner_slider":
        return <BannerSlider {...props} key={section?._id} />;
      case "hero_banner":
        return <Hero {...props} key={section?._id} />;
      case "feature_collection":
        return <CollectionSection {...props} key={section?._id} />;
      case "promo_section":
        return <PromoWidget {...props} key={section?._id} />;
      case "feature_product":
        return <ProductsSection {...props} key={section?._id} />;
      case "rich_text":
        return <RichText {...props} key={section?._id} />;
      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div className="max-w-[1500px]">
      {PageData?.isHeaderFooter && <TemplateHeader sectionData={PageData?.header} />}
      {PageData?.sections?.map((section) => renderSection(section))}
      {PageData?.isHeaderFooter && <TemplateFooter sectionData={PageData?.footer} />}
    </div>
  );
}
