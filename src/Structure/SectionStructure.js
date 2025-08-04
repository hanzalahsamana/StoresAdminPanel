import BannerSlider from '@/components/Widgets/BannerSlider';

const { default: CollectionSection } = require('@/components/Widgets/CollectionSection');
const { default: Hero } = require('@/components/Widgets/Hero');
const { default: ProductsSection } = require('@/components/Widgets/ProductsSection');
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
import CheckoutWidget from '@/components/Widgets/CheckoutWidget';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';

export const SectionStructure = {
  banner_slider: {
    _id: uuidv4(),
    name: 'Banner Slider',
    icon: <TfiLayoutSliderAlt />,
    data: {
      imagesUrl: [
        'https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp',
        'https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp',
      ],
    },
    fields: [
      {
        name: 'imagesUrl',
        label: 'Select Images',
        input: 'ImageSelector',
        multiple: true,
      },
    ],
    component: BannerSlider,
  },

  hero_banner: {
    _id: uuidv4(),
    name: 'Hero Banner',
    icon: <HiOutlinePhoto />,
    data: {
      image: 'https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp',
    },
    fields: [
      {
        name: 'image',
        label: 'Image',
        input: 'ImageSelector',
        multiple: false,
      },
    ],
    component: Hero,
  },

  feature_collection: {
    _id: uuidv4(),
    name: 'Featured Collection',
    icon: <HiOutlineViewGrid />,
    data: {
      heading: 'Featured Collections',
      collectionIds: [],
      style: 'style1',
    },
    fields: [
      {
        name: 'heading',
        label: 'Heading',
        placeholder: 'e.g. Best Sellers',
        input: 'text',
      },
      {
        name: 'collectionIds',
        placeholder: 'Select Collections',
        input: 'dataSelectionList',
        selectorName: 'collections',
        limit: 3,
      },
      {
        name: 'style',
        label: 'Style',
        input: 'pillSelector',
        options: [
          { label: 'Style 1', value: 'style1' },
          { label: 'Style 2', value: 'style2' },
        ],
      },
    ],
    component: CollectionSection,
  },

  feature_product: {
    _id: uuidv4(),
    name: 'Featured Product',
    icon: <HiOutlineShoppingBag />,
    data: {
      heading: 'Featured Product',
      productCount: 1,
      column: 4,
      productsToShow: 'all',
      selectedCollections: [],
      style: 'grid',
    },
    fields: [
      {
        name: 'heading',
        label: 'Heading',
        placeholder: 'e.g. Best Sellers',
        input: 'text',
      },
      {
        name: 'productCount',
        label: 'Product Count',
        placeholder: 'e.g. 6',
        input: 'range',
      },
      {
        name: 'column',
        label: 'Product In One Row',
        placeholder: 'e.g. 4',
        input: 'range',
        min: 1,
        max: 4,
      },
      {
        name: 'productsToShow',
        label: 'Select Products To Show',
        input: 'pillSelector',
        options: [
          { label: 'All Products', value: 'all' },
          { label: 'Selected Collections', value: 'collections' },
        ],
      },
      {
        name: 'selectedCollections',
        placeholder: 'Select Collections',
        input: 'dataSelectionList',
        selectorName: 'collections',
        dependsOn: { field: 'productsToShow', value: 'collections' },
      },
      {
        name: 'style',
        label: 'Style',
        input: 'pillSelector',
        options: [
          { label: 'Grid', value: 'grid' },
          { label: 'Slider', value: 'slider' },
        ],
      },
    ],
    component: ProductsSection,
  },

  promo_section: {
    _id: uuidv4(),
    name: 'Promo Section',
    icon: <HiOutlineTag />,

    data: {
      heading: 'Exclusive Offer!',
      buttonText: 'Shop Now',
      content:
        "Get the best deals on our latest products. Limited-time offer! Enjoy huge discounts, free shipping, and special perks when you shop today. Don't miss out on this opportunity to save big!",
      image: 'https://res.cloudinary.com/duaxitxph/image/upload/v1736859498/v6pws4qg9rfegcqx85en.jpg',
      style: 'style1',
    },

    fields: [
      {
        name: 'heading',
        label: 'Heading',
        placeholder: 'e.g. Our Quality',
        input: 'text',
      },
      {
        name: 'buttonText',
        label: 'Button Text',
        placeholder: 'e.g. Shop Now',
        input: 'text',
      },
      {
        name: 'content',
        label: 'Content',
        input: 'textEditor',
      },
      {
        name: 'image',
        label: 'Image',
        input: 'ImageSelector',
        multiple: false,
        recommended: '500x500',
      },
      {
        label: 'Style',
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
      heading: 'Why Choose Us?',
      content: 'We provide high-quality products with fast delivery and excellent customer service.',
      buttonText: 'Shop Now',
      style: 'Style 1',
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
        label: 'Content',
        name: 'content',
        input: 'textEditor',
      },
      {
        label: 'Select Style',
        name: 'style',
        input: 'pillSelector',
        options: [{ value: 'Style 1' }, { value: 'Style 2' }, { value: 'Style 3' }],
      },
    ],
    component: RichText,
  },

  header: {
    _id: uuidv4(),
    name: 'Header',
    icon: <CgToolbarTop />,
    isGlobal: true,
    data: {
      globalLogo: true,
      headerLogo: 'https://yourcdn.com/logo.png',
      navLinks: [],
      style: 'sticky',
    },
    fields: [
      {
        name: 'globalLogo',
        label: 'Logo',
        placeholder: 'Use Global Site Logo',
        input: 'checkbox',
      },
      {
        name: 'headerLogo',
        placeholder: 'Header Logo',
        input: 'ImageSelector',
        multiple: false,
        dependsOn: { field: 'globalLogo', value: false },
      },
      {
        name: 'navLinks',
        placeholder: 'Menu Links',
        input: 'dataSelectionList',
        selectorName: 'menu links',
        limit: 5,
        options: null,
      },
      {
        name: 'style',
        label: 'Style',
        input: 'pillSelector',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Sticky', value: 'sticky' },
          { label: 'Swipe', value: 'swipe' },
        ],
      },
    ],
    component: TemplateHeader,
  },

  footer: {
    _id: uuidv4(),
    name: 'Footer',
    icon: <CgToolbarBottom />,
    isGlobal: true,
    data: {
      globalLogo: true,
      footerLogo: 'https://yourcdn.com/logo-footer.png',
      email: 'abcd@example.com',
      phone: '+92 300 1234567',
      location: '123 Example Street, A/1, Karachi',
      copyright: '© 2025 YourCompany. All rights reserved.',
      socialLinks: {
        facebook: 'https://facebook.com/yourpage',
        twitter: 'https://twitter.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
      },
      style: 'style1',
    },
    fields: [
      {
        name: 'globalLogo',
        label: 'Logo',
        placeholder: 'Use Global Site Logo',
        input: 'checkbox',
      },
      {
        name: 'footerLogo',
        placeholder: 'Footer Logo',
        input: 'ImageSelector',
        multiple: false,
        dependsOn: { field: 'globalLogo', value: false },
      },
      {
        name: 'email',
        placeholder: ' Contact Email',
        input: 'text',
        type: 'email',
      },
      {
        name: 'phone',
        placeholder: 'Phone No',
        input: 'text',
      },
      {
        name: 'location',
        placeholder: 'Address',
        input: 'text',
      },
      {
        name: 'copyright',
        placeholder: 'Copyright Text',
        input: 'text',
      },
      {
        name: 'socialLinks',
        placeholder: 'Social Links',
        input: 'socialLinkSelector', // again assuming reusable component for link list
      },

      {
        name: 'style',
        label: 'Style',
        input: 'pillSelector',
        options: [
          { label: 'Style 1', value: 'style1' },
          { label: 'Style 2', value: 'style2' },
          { label: 'Style 3', value: 'style3' },
        ],
      },
    ],
    component: TemplateFooter,
  },

  checkout_form: {
    _id: uuidv4(),
    name: 'Checkout Form',
    icon: <MdOutlineShoppingCartCheckout />,
    isGlobal: true,
    data: {
      globalLogo: true,
      checkoutLogo: 'https://yourcdn.com/logo-checkout.png',
      buttonText: 'Place Order',
      contactFields: 'both', // 'both', 'email', 'phone'
      couponInput: true,
      style: 'style1',
    },
    fields: [
      {
        name: 'globalLogo',
        label: 'Logo',
        placeholder: 'Use Global Site Logo',
        input: 'checkbox',
      },
      {
        name: 'checkoutLogo',
        placeholder: 'Checkout Logo',
        input: 'ImageSelector',
        multiple: false,
        dependsOn: { field: 'globalLogo', value: false },
      },
      {
        name: 'contactFields',
        label: 'Contact Fields',
        placeholder: '',
        input: 'radioButton',
        options: [
          { label: 'Just Email', value: 'email' },
          { label: 'Just Phone', value: 'phone' },
          { label: 'Both Email and Phone Required', value: 'bothReq' },
          { label: 'Email Or Phone Required', value: 'bothOpt' },
        ],
      },
      {
        placeholder: 'Show / Hide',
        label: 'Apply Coupon Input',
        name: 'couponInput',
        input: 'toggle',
      },
      {
        placeholder: 'Country',
        label: 'Button Text',
        name: 'buttonText',
        input: 'text',
      },
      {
        name: 'style',
        label: 'Style',
        input: 'pillSelector',
        options: [
          { label: 'Style 1', value: 'style1' },
          { label: 'Style 2', value: 'style2' },
          { label: 'Style 3', value: 'style3' },
        ],
      },
    ],
    component: CheckoutWidget,
  },

  catalog: {
    _id: uuidv4(),
    name: 'Catalog',
    icon: <BsReverseLayoutTextWindowReverse />,
    isGlobal: true,
    data: {
      heading: 'Catalog',
      description: 'Browse all products in one place. Filter, sort, and discover items tailored to your needs.',
      standardFilters: true,
      variantsFilters: true,
      layout: 'grid',
    },
    fields: [
      {
        placeholder: 'e.g. Catalog',
        label: 'Heading',
        name: 'heading',
        input: 'text',
      },
      {
        label: 'Description',
        name: 'description',
        input: 'textEditor',
      },
      {
        placeholder: 'e.g. Sort , Price Range Enable / Disable ',
        label: 'Standard Filters',
        name: 'standardFilters',
        input: 'toggle',
      },
      {
        placeholder: 'Enable / Disable',
        label: 'Variants Filters',
        name: 'variantsFilters',
        input: 'toggle',
      },
      {
        name: 'layout',
        label: 'Layout',
        input: 'pillSelector',
        options: [
          { label: 'Grid', value: 'grid' },
          { label: 'List', value: 'list' },
          { label: 'Classic', value: 'classic' },
        ],
      },
    ],
    component: CheckoutWidget,
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
};
