"use client";

import { useEffect, useRef } from "react";
import Hero from "../Widgets/Hero";
import PromoWidget from "../Widgets/PromoWidget";
import RichText from "../Widgets/RichText";
import BannerSlider from "../Widgets/BannerSlider";
import TemplateFooter from "./TemplateFooter";
import TemplateHeader from "./TemplateHeader";
import { FeatureCollectionSectionWrapper, FeatureProductSectionWrapper } from "@/Utils/PreviewSectionWrappers";
import CheckoutWidget from "../Widgets/CheckoutWidget";
import AddReviews from "../Widgets/addReviews";
import ReviewsList from "../UI/ReviewList";

export default function HomeLayout({ PageData = [], activeSectionId = null, }) {
  const sectionRefs = useRef({});
  const lastScrolledTo = useRef(null);


  console.log(PageData, "⚔️⚔️");


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
    };

    if (section.type === "feature_product") {
      return <FeatureProductSectionWrapper {...props} key={section._id} />
    }
    else if (section.type === "banner_slider") {
      return <BannerSlider {...props} key={section._id} />;
    }
    else if (section.type === "hero_banner") {
      return <Hero {...props} key={section._id} />;
    }
    else if (section.type === "feature_collection") {
      return <FeatureCollectionSectionWrapper {...props} key={section._id} />;
    }
    else if (section.type === "promo_section") {
      return <PromoWidget {...props} key={section._id} />;
    }
    else if (section.type === "rich_text") {
      return <RichText {...props} key={section._id} />;
    }
    else if (section.type === "checkout_form") {
      return <CheckoutWidget {...props} key={section._id} />;
    }
    else if (section.type === "checkout_form") {
      return <AddReviews {...props} key={section._id} />;
    }
    else {
      console.warn(`Unknown section type: ${section.type}`);
      return null;
    }
  };

  return (
    <div className="max-w-[1500px]">
      {PageData?.isHeaderFooter && <TemplateHeader sectionData={PageData?.header} />}
      {PageData?.sections?.map((section) => renderSection(section))}
      {PageData?.isHeaderFooter && <TemplateFooter sectionData={PageData?.footer} />}
      <ReviewsList />
      <AddReviews />
    </div>
  );
}
