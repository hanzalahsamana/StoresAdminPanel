"use client";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Hero from "../Widgets/Hero";
import CollectionSection from "../Widgets/collectionSection";
import PromoWidget from "../Widgets/PromoWidget";
import ProductsSection from "../Widgets/productsSection";
import RichText from "../Widgets/RichText";
import BannerSlider from "../Widgets/BannerSlider";

export default function HomeLayout({ homePageData = [], activeSectionId = null, }) {
  const sectionRefs = useRef({});
  const lastScrolledTo = useRef(null);

  console.log(homePageData, "⚔️⚔️");


  useEffect(() => {
    if (
      activeSectionId &&
      activeSectionId !== lastScrolledTo.current &&
      sectionRefs.current[activeSectionId]
    ) {
      requestAnimationFrame(() => {
        sectionRefs.current[activeSectionId].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        lastScrolledTo.current = activeSectionId;
      });
    }
  }, [activeSectionId]);

  const renderSection = (section) => {
    if (!section || !section.type) return null;

    const refCallback = (el) => {
      if (el) {
        sectionRefs.current[section._id] = el;

        // Add or remove class dynamically
        if (activeSectionId === section._id) {
          el.classList.add("builderSelectedSection");
        } else {
          el.classList.remove("builderSelectedSection");
        }
      }
    };

    const props = {
      ref: refCallback,
      sectionData: section.sectionData,
      'data-section-id': section._id,
      onClick: (e) => {
        e.stopPropagation(); // prevent bubbling
        window.parent.postMessage(
          {
            type: 'SECTION_SELECTED',
            payload: section._id,
          },
          '*'
        );
      },
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
      {homePageData?.map((section) => renderSection(section))}
    </div>
  );
}
