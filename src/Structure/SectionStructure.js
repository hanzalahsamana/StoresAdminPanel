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
    sectionName:'Banner Slider',
    data: {
      title: "Banner Slider",
      imagesUrl:[
        "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp",
        "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp",
      ]
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
    data: {
      title: "",
      selectedCategories: [],
    },
    fields: [
      {
        name: "title",
        placeholder: "Title",
        input: "text",
      },
      {
        name: "selectedCategories",
        placeholder: "Select Collections",
        input: "multiDropdown",
        options: "collections",
      },
    ],
    component: CollectionSection,
  },
  promo_section: {
    data: {
      title: "",
      image: "",
      text: "",
      buttonText: "",
      styleType: "",
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
    data: {
      title: "",
      text: "",
      buttonText: "",
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
    data: {
      title: "",
      maxLength:4,
      productType:"",
      selectedCategories:[],
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
        options: ["All", "Selected Categories", "Selected Products"],
      },
      {
        name: "selectedCategories",
        placeholder: "Select Category",
        input: "multiDropdown",
        options: "collections",
        dependsOn: { field: "productType", value: "Selected Categories" },
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
