import BannerSlider from "@/components/Widgets/BannerSlider";

const {
  default: CollectionSection,
} = require("@/components/Widgets/collectionSection");
const { default: Hero } = require("@/components/Widgets/hero");
const {
  default: ProductsSection,
} = require("@/components/Widgets/productsSection");
const { default: PromoWidget } = require("@/components/Widgets/PromoWidget");
const { default: RichText } = require("@/components/Widgets/RichText");

export const SectionStructure = {
  banner_slider: {
    sectionName: "Banner Slider",
    data: {
      title: "Banner Slider",
      imagesUrl: [
        "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp",
        "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp",
      ],
    },
    fields: [
      {
        name: "title",
        placeholder: "Title",
        input: "text",
      },
      {
        name: "imagesUrl",
        placeholder: "ImagesUrls",
        input: "multiImageUploader",
      },
    ],
    component: BannerSlider,
  },
  
  hero_banner: {
    sectionName: "Hero Banner",
    data: {
      title: "Hero Banner",
      image:
        "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp",
    },
    fields: [
      {
        name: "title",
        placeholder: "Title",
        input: "text",
      },
      {
        name: "image",
        placeholder: "Image",
        input: "imageUploader",
      },
    ],
    component: Hero,
  },

  feature_collection: {
    sectionName: "Featured Collection",
    data: {
      title: "Featured Collection",
      selectedcollections: [],
    },
    fields: [
      {
        name: "title",
        placeholder: "Title",
        input: "text",
      },
      {
        name: "selectedcollections",
        placeholder: "Select Collections",
        input: "multiDropdown",
        options: "collections",
      },
    ],
    component: CollectionSection,
  },

  promo_section: {
    sectionName: "Promo Section",

    data: {
      title: "Exclusive Offer!",
      image:
        "https://res.cloudinary.com/duaxitxph/image/upload/v1736859498/v6pws4qg9rfegcqx85en.jpg",
      text: "Get the best deals on our latest products. Limited-time offer! Enjoy huge discounts, free shipping, and special perks when you shop today. Don't miss out on this opportunity to save big!",
      buttonText: "Shop Now",
      styleType: "style1",
    },
    fields: [
      {
        name: "title",
        placeholder: "Title",
        input: "text",
      },
      {
        name: "styleType",
        placeholder: "Style Type",
        input: "dropdown",
        options: ["style1", "style2"],
      },
      {
        name: "text",
        placeholder: "Description",
        input: "textEditor",
      },
      {
        name: "image",
        placeholder: "Image",
        input: "imageUploader",
      },
    ],
    component: PromoWidget,
  },

  rich_text: {
    sectionName: "Rich Text",

    data: {
      title: "Why Choose Us?",
      text: "We provide high-quality products with fast delivery and excellent customer service.",
      buttonText: "Shop Now",
    },
    fields: [
      {
        name: "title",
        placeholder: "Title",
        input: "text",
      },
      {
        name: "buttonText",
        placeholder: "Button Text",
        input: "text",
      },
      {
        name: "text",
        placeholder: "Description",
        input: "textEditor",
      },
    ],
    component: RichText,
  },

  feature_product: {
    sectionName: "Featured Product",
    data: {
      title: "Featured Product",
      maxLength: 4,
      productType: "All",
      selectedcollections: [],
      selectedProducts: [],
    },
    fields: [
      {
        name: "title",
        placeholder: "Title",
        input: "text",
      },
      {
        name: "maxLength",
        placeholder: "Maximum Length Of Products",
        input: "number",
      },
      {
        name: "productType",
        placeholder: "Products To Show",
        input: "dropdown",
        options: ["All", "Selected collections", "Selected Products"],
      },
      {
        name: "selectedcollections",
        placeholder: "Select Collection",
        input: "multiDropdown",
        options: "collections",
        dependsOn: { field: "productType", value: "Selected collections" },
      },
      {
        name: "selectedProducts",
        placeholder: "Select Products",
        input: "multiDropdown",
        options: "products",
        dependsOn: { field: "productType", value: "Selected Products" },
      },
    ],
    component: ProductsSection,
  },
};
