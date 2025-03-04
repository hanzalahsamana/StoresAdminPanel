"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Button from '@/components/Actions/Button';
import ActionCard from '@/components/Cards/ActionCard';
import FormInput from '@/components/Forms/FormInput';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import FaqUploader from '@/components/Uploaders/FaqUploader';
import ImageUploader from '@/components/Uploaders/ImageUploader';
import TextEditor from '@/components/Uploaders/TextEditor';
import { selectPageByID } from '@/Redux/PagesData/PagesDataSlice';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "../../../components/UI/style.css";


const componentMapping = {
  "About Us": ["title", "text", "image"],
  "Hero Banner": ["image"],
  "FAQ": ["title", "faqs"],
  "Contact": ["title", "email", "phone", "address"],
  "Terms and Conditions": ["title", "text"],
  "Our Quality": ["title", "buttonText", "text", "image"],
  "Manufacture Process": ["title", "text", "image"],
  "Privacy Policy": ["title", "text"],
  "Return Policy": ["title", "text"],
  "Shipping Policy": ["title", "text"],
  "Site Logo": ["image"],
  "Fabric Remants": ["title", "buttonText", "text", "image"],
};



const ContentEdit = () => {
  const params = useParams()
  const page = useSelector((state) => selectPageByID(state, params?.pageid));
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


  const renderComponents = () => {
    const fields = componentMapping[formData.type] || [];
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
            className={`border-y border-[#c9c9c98f] py-[25px] px-[20px] modal-grid ${getGridClass()}`}
          >
            {renderComponents()}
          </div>
        </ActionCard>
    </BackgroundFrame>
  )
}

export default ProtectedRoute(ContentEdit);