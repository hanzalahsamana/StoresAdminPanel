import BannerSlider from '@/components/Widgets/BannerSlider';

const { default: CollectionSection } = require('@/components/Widgets/collectionSection');
const { default: Hero } = require('@/components/Widgets/hero');
const { default: ProductsSection } = require('@/components/Widgets/productsSection');
const { default: PromoWidget } = require('@/components/Widgets/PromoWidget');
const { default: RichText } = require('@/components/Widgets/RichText');
import { v4 as uuidv4 } from 'uuid';
import {
  HiOutlinePhoto,
  HiOutlineSquares2X2,
  HiOutlineTag,
  HiOutlinePencilSquare,
  HiOutlineShoppingBag,
  HiOutlineInbox,
  HiOutlineEnvelope,
  HiOutlineBolt,
  HiOutlineMapPin,
  HiOutlinePlayCircle,
  HiOutlineStar,
  HiOutlineCheckCircle,
  HiOutlineUsers,
  HiOutlineBars3BottomLeft,
} from 'react-icons/hi2';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import TemplateFooter from '@/components/Layout/TemplateFooter';
import TemplateHeader from '@/components/Layout/TemplateHeader';
import { CgToolbarBottom, CgToolbarTop } from 'react-icons/cg';

export const SectionStructure = {
  banner_slider: {
    _id: uuidv4(),
    name: 'Banner Slider',
    icon: <TfiLayoutSliderAlt />,
    data: {
      title: 'Banner Slider',
      imagesUrl: [
        'https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp',
        'https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp',
      ],
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'imagesUrl',
        placeholder: 'ImagesUrls',
        input: 'multiImageUploader',
      },
    ],
    component: BannerSlider,
  },

  hero_banner: {
    _id: uuidv4(),
    name: 'Hero Banner',
    icon: <HiOutlinePhoto />,
    data: {
      title: 'Hero Banner',
      image: 'https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp',
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'image',
        placeholder: 'Image',
        input: 'imageUploader',
      },
    ],
    component: Hero,
  },

  feature_collection: {
    _id: uuidv4(),
    name: 'Featured Collection',
    icon: <HiOutlineViewGrid />,
    data: {
      title: 'Featured Collection',
      selectedcollections: [],
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'selectedcollections',
        placeholder: 'Select Collections',
        input: 'multiDropdown',
        options: 'collections',
      },
    ],
    component: CollectionSection,
  },

  promo_section: {
    _id: uuidv4(),
    name: 'Promo Section',
    icon: <HiOutlineTag />,

    data: {
      title: 'Exclusive Offer!',
      image: 'https://res.cloudinary.com/duaxitxph/image/upload/v1736859498/v6pws4qg9rfegcqx85en.jpg',
      text: "Get the best deals on our latest products. Limited-time offer! Enjoy huge discounts, free shipping, and special perks when you shop today. Don't miss out on this opportunity to save big!",
      buttonText: 'Shop Now',
      styleType: 'style1',
    },
    fields: [
      {
        name: 'title',
        label: 'Title',
        placeholder: 'e.g. Our Quality',
        input: 'text',
      },
      {
        name: 'content',
        label: 'Content',
        input: 'textEditor',
      },
      {
        name: 'image',
        label: 'Upload Image',
        input: 'imageUploader',
        recommended:'500x500'
      },
      {
        label: 'Select Style',
        name: 'style',
        input: 'pillSelector',
        options: [
          { label: 'Style 1', value: 'style1' },
          { label: 'Style 2', value: 'style2' },
        ],
      },
    ],
    component: PromoWidget,
  },

  rich_text: {
    _id: uuidv4(),
    name: 'Rich Text',
    icon: <HiOutlinePencilSquare />,

    data: {
      title: 'Why Choose Us?',
      text: 'We provide high-quality products with fast delivery and excellent customer service.',
      buttonText: 'Shop Now',
    },
    fields: [
      {
        placeholder: 'e.g. Why Choose Us?',
        label: 'Heading',
        name: 'heading',
        input: 'text',
      },
      {
        placeholder: 'e.g. Shop Now',
        label: 'Button Text',
        name: 'buttonText',
        input: 'text',
      },
      {
        label: 'Description',
        name: 'description',
        input: 'textEditor',
      },
      {
        label: 'Select Style',
        name: 'style',
        input: 'pillSelector',
        options: [{ label: 'Style 1' }, { label: 'Style 2' }, { label: 'Style 3' }],
      },
    ],
    component: RichText,
  },

  feature_product: {
    _id: uuidv4(),
    name: 'Featured Product',
    icon: <HiOutlineShoppingBag />,
    data: {
      title: 'Featured Product',
      maxLength: 4,
      productType: 'All',
      selectedcollections: [],
      selectedProducts: [],
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'maxLength',
        placeholder: 'Maximum Length Of Products',
        input: 'number',
      },
      {
        name: 'productType',
        placeholder: 'Products To Show',
        input: 'dropdown',
        options: ['All', 'Selected collections', 'Selected Products'],
      },
      {
        name: 'selectedcollections',
        placeholder: 'Select Collection',
        input: 'multiDropdown',
        options: 'collections',
        dependsOn: { field: 'productType', value: 'Selected collections' },
      },
      {
        name: 'selectedProducts',
        placeholder: 'Select Products',
        input: 'multiDropdown',
        options: 'products',
        dependsOn: { field: 'productType', value: 'Selected Products' },
      },
    ],
    component: ProductsSection,
  },

  testimonials: {
    _id: uuidv4(),
    name: 'Customer Testimonials',
    comingSoon: true,
    icon: <HiOutlineUsers />,
    data: {
      title: 'What Our Customers Say',
      testimonials: [],
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Section Title',
        input: 'text',
      },
      {
        name: 'testimonials',
        placeholder: 'Add Testimonials',
        input: 'repeater',
        fields: [
          { name: 'name', placeholder: 'Customer Name', input: 'text' },
          { name: 'message', placeholder: 'Review Message', input: 'textEditor' },
          { name: 'rating', placeholder: 'Rating', input: 'number' },
        ],
      },
    ],
  },

  trust_badges: {
    _id: uuidv4(),
    name: 'Trust Badges',
    comingSoon: true,
    icon: <HiOutlineCheckCircle />,
    data: {
      badges: [],
    },
    fields: [
      {
        name: 'badges',
        placeholder: 'Add Trust Badges',
        input: 'repeater',
        fields: [
          { name: 'icon', placeholder: 'Badge Icon URL', input: 'imageUploader' },
          { name: 'label', placeholder: 'Label', input: 'text' },
        ],
      },
    ],
  },

  reviews_section: {
    _id: uuidv4(),
    name: 'Product Reviews',
    comingSoon: true,
    icon: <HiOutlineStar />,
    data: {
      title: 'Customer Reviews',
      ratingSummary: '4.8/5 based on 300+ reviews',
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'ratingSummary',
        placeholder: 'Summary Text',
        input: 'text',
      },
    ],
  },

  video_section: {
    _id: uuidv4(),
    name: 'Video Section',
    comingSoon: true,
    icon: <HiOutlinePlayCircle />,
    data: {
      title: 'Watch Our Story',
      videoUrl: '',
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'videoUrl',
        placeholder: 'Video URL (YouTube/Vimeo)',
        input: 'text',
      },
    ],
  },

  store_locator: {
    _id: uuidv4(),
    name: 'Store Locator',
    comingSoon: true,
    icon: <HiOutlineMapPin />,
    data: {
      title: 'Find a Store Near You',
      stores: [],
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'stores',
        placeholder: 'Add Store Locations',
        input: 'repeater',
        fields: [
          { name: 'location', placeholder: 'Location Name', input: 'text' },
          { name: 'address', placeholder: 'Address', input: 'text' },
        ],
      },
    ],
  },

  usp_icons: {
    _id: uuidv4(),
    name: 'Unique Selling Points',
    comingSoon: true,
    icon: <HiOutlineBolt />,
    data: {
      uspList: [],
    },
    fields: [
      {
        name: 'uspList',
        placeholder: 'Add USP Items',
        input: 'repeater',
        fields: [
          { name: 'icon', placeholder: 'Icon URL', input: 'imageUploader' },
          { name: 'text', placeholder: 'USP Text', input: 'text' },
        ],
      },
    ],
  },

  newsletter_signup: {
    _id: uuidv4(),
    name: 'Newsletter Signup',
    comingSoon: true,
    icon: <HiOutlineEnvelope />,
    data: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Stay updated with our latest deals and products.',
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Title',
        input: 'text',
      },
      {
        name: 'subtitle',
        placeholder: 'Subtitle',
        input: 'text',
      },
    ],
  },

  faq_section: {
    _id: uuidv4(),
    name: 'FAQ Section',
    comingSoon: true,
    icon: <HiOutlineInbox />,
    data: {
      title: 'Frequently Asked Questions',
      faqs: [],
    },
    fields: [
      {
        name: 'title',
        placeholder: 'Section Title',
        input: 'text',
      },
      {
        name: 'faqs',
        placeholder: 'Add FAQ Items',
        input: 'repeater',
        fields: [
          { name: 'question', placeholder: 'Question', input: 'text' },
          { name: 'answer', placeholder: 'Answer', input: 'textEditor' },
        ],
      },
    ],
  },

  header: {
    _id: uuidv4(),
    name: 'Header',
    icon: <CgToolbarTop />,
    data: {
      logo: 'https://yourcdn.com/logo.png',
      navLinks: [
        { label: 'Home', url: '/' },
        { label: 'Shop', url: '/shop' },
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
      ],
      ctaText: 'Sign Up',
      ctaUrl: '/signup',
    },
    fields: [
      {
        name: 'logo',
        placeholder: 'Logo Image',
        input: 'imageUploader',
      },
      {
        name: 'navLinks',
        placeholder: 'Navigation Links',
        input: 'linkListEditor', // assume custom component for managing link list
      },
      {
        name: 'ctaText',
        placeholder: 'CTA Button Text',
        input: 'text',
      },
      {
        name: 'ctaUrl',
        placeholder: 'CTA Button URL',
        input: 'text',
      },
    ],
    component: TemplateHeader,
  },

  footer: {
    _id: uuidv4(),
    name: 'Footer',
    icon: <CgToolbarBottom />,

    data: {
      logo: 'https://yourcdn.com/logo-footer.png',
      description: 'Stay connected with us for the latest updates and offers.',
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com' },
        { platform: 'Instagram', url: 'https://instagram.com' },
        { platform: 'Twitter', url: 'https://twitter.com' },
      ],
      copyright: '© 2025 YourCompany. All rights reserved.',
    },
    fields: [
      {
        name: 'logo',
        placeholder: 'Logo',
        input: 'imageUploader',
      },
      {
        name: 'description',
        placeholder: 'Description',
        input: 'textEditor',
      },
      {
        name: 'socialLinks',
        placeholder: 'Social Links',
        input: 'linkListEditor', // again assuming reusable component for link list
      },
      {
        name: 'copyright',
        placeholder: 'Copyright Text',
        input: 'text',
      },
    ],
    component: TemplateFooter,
  },
};
