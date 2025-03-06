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


const componentMapping = {
  "About Us": {
    component: RichText,
    fields: ["title", "text"]
  },
  "Hero Banner": {
    fields: ["image"],
    component: '',
  },
  "FAQ": {
    fields: ["title", "faqs"],
    component: FAQs,
  },
  "Contact": {
    fields: ["title", "email", "phone", "address"],
    component: '',
  },
  "Terms and Conditions": {
    fields: ["title", "text"],
    component: RichText,
  },
  "Our Quality": {
    fields: ["title", "buttonText", "text", "image"],
    component: CollectionAbout,
  },
  "Manufacture Process": {
    fields: ["title", "text", "image"],
    component: FabricsLiberary,
  },
  "Privacy Policy": {
    fields: ["title", "text"],
    component: RichText,
  },
  "Return Policy": {
    fields: ["title", "text"],
    component: RichText,
  },
  "Shipping Policy": {
    fields: ["title", "text"],
    component: RichText,
  },
  "Site Logo": {
    fields: ["image"],
    component: '',
  },
  "Fabric Remants": {
    fields: ["title", "buttonText", "text", "image"],
    component: FabricsAbout,
  },
};



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

  const getGridClass = () => {
    const fields = componentMapping[formData.type] || [];
    const count = fields.length;

    if (count === 1) return "single";
    if (count === 2) return "double";
    if (count === 3) return "triple";
    if (count >= 4) return "quad";
    return "";
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
      >
        <div
          className={` border-[#c9c9c98f] shadow-[inset_0px_0px_12px_#04989a17] p-[20px] max-h-[300px] overflow-y-auto customScroll flex flex-col`}
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