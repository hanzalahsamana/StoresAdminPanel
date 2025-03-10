"use client";

import React, { Component, useEffect, useState } from 'react'
import "../../../components/UI/style.css";
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Button from '@/components/Actions/Button';
import ActionCard from '@/components/Cards/ActionCard';
import FormInput from '@/components/Forms/FormInput';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import FaqUploader from '@/components/Uploaders/FaqUploader';
import ImageUploader from '@/components/Uploaders/ImageUploader';
import TextEditor from '@/components/Uploaders/TextEditor';
import LivePreview from '@/components/UI/LivePreview';
import RichText from '@/components/Widgets/RichText';
import { selectPageByID } from '@/Redux/PagesData/PagesDataSlice';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import FabricsAbout from '@/components/Widgets/fabricsAbout';
import FAQs from '@/components/Widgets/Faqs';
import { Base_Domain, HTTP } from '../../../../config';
import FabricsLiberary from '@/components/Widgets/fabricsLiberary';
import CollectionAbout from '@/components/Widgets/collectionAbout';
import ContentPage from '@/components/Sections/ContentPage';


const fields = {
  title: {
    name: 'title',
    uploader: 'input',
  },
  image: {
    name: 'image',
    uploader: 'image'
  }

}

const componentMapping = {

  hero_banner: {
    fields: ["title", "image"],
    formData: { title: "", image: "" },
  },
  feature_collection: {
    fields: ["collections", "title"],
    defaultValues: { title: '', collections: [] }, // This will store an array of collection IDs
  },
  promo_section: {
    fields: ["title", "description", "image", "buttonText", "buttonLink"],
    defaultValues: { title: "", description: "", image: "", buttonText: "", buttonLink: "" },
  },
  products_section: {
    fields: ["maxLength", "products", "title"],
    defaultValues: { maxLength: 4, products: [], title: "Best Sellers" },
  },
  rich_text: {
    fields: ["content"],
    defaultValues: { content: "" },
  },
};


// const componentMapping = {
//   "About Us": {
//     component: ContentPage,
//     fields: ["title", "text"]
//   },
//   "Hero Banner": {
//     fields: ["image"],
//     component: '',
//   },
//   "FAQ": {
//     fields: ["title", "faqs"],
//     component: FAQs,
//   },
//   "Contact": {
//     fields: ["title", "email", "phone", "address"],
//     component: '',
//   },
//   "Terms and Conditions": {
//     fields: ["title", "text"],
//     component: ContentPage,
//   },
//   "Our Quality": {
//     fields: ["title", "buttonText", "text", "image"],
//     component: CollectionAbout,
//   },
//   "Manufacture Process": {
//     fields: ["title", "text", "image"],
//     component: FabricsLiberary,
//   },
//   "Privacy Policy": {
//     fields: ["title", "text"],
//     component: ContentPage,
//   },
//   "Return Policy": {
//     fields: ["title", "text"],
//     component: ContentPage,
//   },
//   "Shipping Policy": {
//     fields: ["title", "text"],
//     component: ContentPage,
//   },
//   "Site Logo": {
//     fields: ["image"],
//     component: '',
//   },
//   "Fabric Remants": {
//     fields: ["title", "buttonText", "text", "image"],
//     component: FabricsAbout,
//   },
// };



const ContentEdit = () => {

  const params = useParams()
  const page = useSelector((state) => selectPageByID(state, params?.pageid));
  const { currUser } = useSelector((state) => state.currentUser);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    text: "",
    image: "",
    faqs: [{ Q: "", A: "" }],
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // const getPageLink = () => {
  //   return `${HTTP}${currUser?.subDomain}.${Base_Domain}/pages/${}`
  // }

  const renderComponents = () => {
    const fields = componentMapping[formData.type]?.fields || [];
    return fields.map((field) => {
      if (["title", "email", "phone", "address", "buttonText"].includes(field)) {
        return (
          <FormInput
            key={field}
            value={formData[field]}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            handleChange={(e) => handleInputChange(field, e.target.value)}
            className='!outline-primaryC !bg-transparent'

          />
        );
      }
      if (field === "text") {
        return (
          <TextEditor
            editorContent={formData[field]}
            setEditorContent={(value) => handleInputChange(field, value)}
          />
        );
      }
      if (field === "faqs") {
        return (
          <FaqUploader
            key={field}
            initialFaqs={formData[field]}
            setFaqs={(faqs) => handleInputChange(field, faqs)}
          />
        );
      }
      if (field === "image") {
        return (
          <ImageUploader
            key={field}
            image={formData[field]}
            setImage={(image) => handleInputChange(field, image)}
          />
        );
      }
      return null;
    });
  };

  useEffect(() => {
    if (page) {
      const { _id, __v, updatedAt, ...rest } = page;
      setFormData(rest);
    }
  }, [page]);

  if (!page) {
    return (
      <div className='flex w-full justify-center py-[75px] text-center text-textTC text-[18px]'>
        <p>There is no any Content At this page .</p>
      </div>
    )
  }


  return (
    <BackgroundFrame>

      <ActionCard
        actions={<Button label="Save" className="w-max" />}
        lable={page.type}
        className={'!p-4'}
      >
        <div
          className={` border-[#c9c9c98f] shadow-[inset_0px_0px_12px_#dadada] p-[20px] max-h-[340px] overflow-y-auto customScroll flex flex-col`}
        >
          <div className='flex flex-col gap-3'>
            {renderComponents()}
          </div>
        </div>
      </ActionCard>
      <LivePreview>
        {componentMapping[formData.type]?.component &&
          React.createElement(componentMapping[formData.type].component, { content: formData })
        }
      </LivePreview>
    </BackgroundFrame>
  )
}

export default ProtectedRoute(ContentEdit);