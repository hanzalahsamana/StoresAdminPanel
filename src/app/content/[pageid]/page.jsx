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
import { selectPageByID } from '@/Redux/PagesData/PagesDataSlice';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import FabricsAbout from '@/components/Widgets/fabricsAbout';
import FAQs from '@/components/Widgets/Faqs';
import _ from "lodash";
import FabricsLiberary from '@/components/Widgets/fabricsLiberary';
import CollectionAbout from '@/components/Widgets/collectionAbout';
import ContentPage from '@/components/Sections/ContentPage';
import { uploadToCloudinary } from '@/Utils/uploadToCloudinary';
import { editPagesData } from '@/APIs/PagesData/editPagesData';
import { toast } from 'react-toastify';
import { CiUndo } from 'react-icons/ci';
import IconButton from '@/components/Actions/IconButton';
import { uploadSingleImageToS3 } from '@/APIs/uploadImageS3';
import { pageDataValidate } from '@/Utils/FormsValidator';


const componentMapping = {
  "About Us": {
    component: ContentPage,
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
    component: ContentPage,
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
    component: ContentPage,
  },
  "Return Policy": {
    fields: ["title", "text"],
    component: ContentPage,
  },
  "Shipping Policy": {
    fields: ["title", "text"],
    component: ContentPage,
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
  const dispatch = useDispatch();

  const page = useSelector((state) => selectPageByID(state, params?.pageid));
  const { currUser } = useSelector((state) => state.currentUser);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

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


  const renderComponents = () => {
    const fields = componentMapping[formData.type]?.fields || [];
    return fields.map((field, index) => {
      if (["title", "email", "phone", "address", "buttonText"].includes(field)) {
        return (
          <FormInput
            key={index}
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
            key={index}
            editorContent={formData[field]}
            setEditorContent={(value) => handleInputChange(field, value)}
          />
        );
      }
      if (field === "faqs") {
        return (
          <FaqUploader
            key={index}
            initialFaqs={formData[field]}
            setFaqs={(faqs) => handleInputChange(field, faqs)}
          />
        );
      }
      if (field === "image") {
        return (
          <ImageUploader
            key={index}
            image={formData[field]}
            setImage={(image) => handleInputChange(field, image)}
          />
        );
      }
      return null;
    });
  };

  const handleSubmit = async () => {
    try {
      const validationErrors = pageDataValidate(componentMapping, formData);
      if (validationErrors.length > 0) {
        toast.error(validationErrors[0]);
        return;
      }
      setLoading(true)

      let updatedData = { ...formData };

      if (formData?.image && formData?.image instanceof File) {
        const uploadedImageUrl = await uploadSingleImageToS3(currUser?.brandName, formData.image);
        updatedData.image = uploadedImageUrl;
      }
      await editPagesData(updatedData, currUser?.brandName, page?._id, dispatch);
      setLoading(false)
      toast.success("Form submitted successfully!");
    } catch (error) {
      setLoading(false)
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  useEffect(() => {
    if (page) {
      const { _id, __v, updatedAt, ...rest } = page;
      setFormData(rest);
    }
  }, [page]);

  useEffect(() => {
    const { _id, __v, updatedAt, ...rest } = page;
    setIsModified(!_.isEqual(rest, formData));
  }, [page, formData]);

  const discardData = () => {
    const { _id, __v, updatedAt, ...rest } = page;
    setFormData(rest);
  }

  if (!page) {
    return (
      <div className='flex w-full justify-center py-[75px] text-center text-textTC text-[18px]'>
        <p>There is no any Content At this page .</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-start flex-col md:flex-row">

      <BackgroundFrame>

        <ActionCard
          actions={
            <>
              <Button size='small' active={isModified} label="Save" loading={loading} variant='black' className="w-max" action={handleSubmit} />
              <IconButton
                icon={<CiUndo />}
                tooltipLabel={'discard'}
                className={` !text-[22px] ${isModified ? 'text-black' : 'text-[#4f4c4c89] !cursor-not-allowed'}`}
                action={discardData}
              />
            </>}
          actionPosition='top'
          lable={page.type}
          className={'!p-4'}
        >
          <div
            className={` border-[#c9c9c98f] border-t py-[20px] h-[340px] overflow-y-auto customScroll flex flex-col`}
          >
            <div className='flex flex-col gap-3'>
              {renderComponents()}
            </div>
          </div>
        </ActionCard>

      </BackgroundFrame>
      <LivePreview>
        {componentMapping[formData.type]?.component &&
          React.createElement(componentMapping[formData.type].component, { content: formData })
        }
      </LivePreview>
    </div>
  )
}

export default ProtectedRoute(ContentEdit);