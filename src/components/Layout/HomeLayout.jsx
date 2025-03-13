"use client";

import { useSelector } from "react-redux";
import Hero from "../Widgets/hero";
import CollectionSection from "../Widgets/collectionSection";
import PromoWidget from "../Widgets/PromoWidget";
import ProductsSection from "../Widgets/productsSection";
import RichText from "../Widgets/RichText";

export default function HomeLayout() {
  const { sectionsData } = useSelector((state) => state.sectionsData);

  const renderSection = (section) => {
    if (!section || !section.type) return null;

    switch (section.type) {
      case "hero_banner":
        return <Hero key={section._id} content={section?.content} />;

      case "feature_collection":
        return (
          <CollectionSection
            key={section._id}
            content={section?.content}
          />
        );

      case "promo_section":
        return <PromoWidget key={section._id} content={section?.content} />;

      case "feature_product":
        return <ProductsSection key={section._id} content={section?.content} />;

      case "rich_text":
        return <RichText key={section._id} content={section?.content} />;

      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div className="max-w-[1500px]">
      {sectionsData?.map((section) => renderSection(section))}
    </div>
  );
}
