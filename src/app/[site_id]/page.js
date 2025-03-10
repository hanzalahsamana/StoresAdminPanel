"use client";

import CollectionAbout from "@/components/Widgets/collectionAbout";
import CollectionSection from "@/components/Widgets/collectionSection";
import FabricsAbout from "@/components/Widgets/fabricsAbout";
import FabricsLiberary from "@/components/Widgets/fabricsLiberary";
import Hero from "@/components/Widgets/hero";
import ProductsSection from "@/components/Widgets/productsSection";
import PromoWidget from "@/components/Widgets/PromoWidget";
import RichText from "@/components/Widgets/RichText";
import { useSelector } from "react-redux";

export default function Home() {
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
            Categories={section?.content?.collections || []}
            content={section?.content}
          />
        );

      case "promo_section":
        return <PromoWidget key={section._id} content={section?.content} />;

      case "feature_product":
        return (
          <ProductsSection
            key={section._id}
            maxLength={section?.content?.maxLength || 4}
            collection={section?.content?.products || "all"}
            name={section?.content?.title || "Best Sellers"}
          />
        );

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
