"use client";

import CollectionAbout from "@/components/TemplateComponents/sections/collectionAbout";
import CollectionSection from "@/components/TemplateComponents/sections/collectionSection";
import FabricsAbout from "@/components/TemplateComponents/sections/fabricsAbout";
import FabricsLiberary from "@/components/TemplateComponents/sections/fabricsLiberary";
import Hero from "@/components/TemplateComponents/sections/hero";
import ProductsSection from "@/components/TemplateComponents/sections/productsSection";

export default function Home() {
  return (
    <div className="max-w-[1500px]">
      <Hero />
      <CollectionSection CategoryNumber={3} />
      <FabricsAbout />
      <ProductsSection maxLength={4} collection={"all"} name={"Best Sellers"} />
      <CollectionAbout />
      <ProductsSection
        maxLength={4}
        collection={"all"}
        name={"Discover More"}
      />
      <FabricsLiberary />
      {/* <AddReviews/> */}
      {/* <Contact /> */}
    </div>
  );
}
