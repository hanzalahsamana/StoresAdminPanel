"use client";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Hero from "../Widgets/Hero";
import CollectionSection from "../Widgets/CollectionSection";
import PromoWidget from "../Widgets/PromoWidget";
import ProductsSection from "../Widgets/ProductsSection";
import RichText from "../Widgets/RichText";
import BannerSlider from "../Widgets/BannerSlider";
import TemplateHeader from "./TemplateHeader";
import TemplateFooter from "./TemplateFooter";
import Catalog from "../Widgets/Catalog";

export default function PageStructureGenrator({ PageData = [] }) {

  console.log(PageData, "⚔️⚔️");

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
      case "catalog":
        return <Catalog {...props} key={section?._id} />;
      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div className="max-w-[1500px] w-full">
      {PageData?.isHeaderFooter && <TemplateHeader sectionData={PageData?.header} />}
      {PageData?.sections?.map((section) => renderSection(section))}
      {PageData?.isHeaderFooter && <TemplateFooter sectionData={PageData?.footer} />}
    </div>
  );
}
