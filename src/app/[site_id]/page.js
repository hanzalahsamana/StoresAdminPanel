"use client";

import CollectionAbout from "@/components/Widgets/collectionAbout";
import CollectionSection from "@/components/Widgets/collectionSection";
import FabricsAbout from "@/components/Widgets/fabricsAbout";
import FabricsLiberary from "@/components/Widgets/fabricsLiberary";
import Hero from "@/components/Widgets/hero";
import ProductsSection from "@/components/Widgets/productsSection";

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
