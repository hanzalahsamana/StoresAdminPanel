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
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectSectionByID, setEditSectionLoading } from '@/Redux/SectionsData/SectionsDataSlice';
import Hero from '@/components/Widgets/hero';
import PromoWidget from '@/components/Widgets/PromoWidget';
import ProductsSection from '@/components/Widgets/productsSection';
import CollectionSection from '@/components/Widgets/collectionSection';
import { SectionStructure } from '@/Structure/SectionStructure';
import DropDown from '@/components/Actions/DropDown';
import MultiSelectDropdown from '@/components/Actions/MultiSelectDropdown';
import { uploadToCloudinary } from '@/Utils/uploadToCloudinary';
import { editSectionsData } from '@/APIs/SectionsData/editSectionsData';
import { toast } from 'react-toastify';




const ContentEdit = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const section = useSelector((state) => selectSectionByID(state, params?.sectionid));
  const { currUser } = useSelector((state) => state.currentUser);
  const { products } = useSelector((state) => state.productData);
  const { categories } = useSelector((state) => state.categories);
  const { editSectionLoading } = useSelector((state) => state.sectionsData);

  const [formData, setFormData] = useState(SectionStructure?.[section?.type]?.data);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };


  const renderComponents = () => {
    const fields = SectionStructure[section?.type]?.fields || [];
    return fields.map(({ name, placeholder, input, options, dependsOn }) => {

      if (dependsOn) {
        const { field: depField, value: expectedValue } = dependsOn;
        if (formData?.[depField] !== expectedValue) {
          return null;
        }
      }

      if (input === "text" || input === "number") {
        return (
          <FormInput
            type={input}
            key={name}
            value={formData?.[name]}
            placeholder={placeholder}
            handleChange={(e) => handleInputChange(name, e.target.value)}
            className='!outline-primaryC !bg-transparent'

          />
        );
      }

      if (input === "textEditor") {
        return (
          <TextEditor
            key={name}
            editorContent={formData?.[name]}
            setEditorContent={(value) => handleInputChange(name, value)}
          />
        );
      }

      if (input === "faqs") {
        return (
          <FaqUploader
            key={name}
            initialFaqs={formData?.[name]}
            setFaqs={(faqs) => handleInputChange(name, faqs)}
          />
        );
      }

      if (input === "imageUploader") {
        return (
          <ImageUploader
            key={name}
            image={formData?.[name]}
            setImage={(image) => handleInputChange(name, image)}
          />
        );
      }

      if (input === "dropdown") {
        return (
          <DropDown
            defaultOptions={options}
            selectedOption={formData?.[name]}
            setSelectedOption={(option) => handleInputChange(name, option)}
            key={name}
            placeholder={placeholder}
            className='!outline-primaryC !bg-transparent'
          />
        );
      }

      if (input === "multiDropdown") {
        const optionsData =
          options === "products"
            ? products.map((product) => product?.name)
            : options === "collections"
              ? categories.map((category) => category?.link)
              : [];

        return (
          <MultiSelectDropdown
            key={name}
            wantsCustomOption={false}
            defaultOptions={optionsData}
            selectedOptions={Array.isArray(formData?.[name]) ? formData?.[name] : []}
            setSelectedOptions={(options) => handleInputChange(name, options)}
            placeholder={placeholder}
            className='!outline-primaryC !bg-transparent'
          />
        );
      }

      return null;
    });
  };

  const handleSubmit = async () => {
    try {
      // const validationErrors = validateForm(componentMapping, formData);
      // if (validationErrors.length > 0) {
      //   toast.error(validationErrors[0]);
      //   return;
      // }

      let updatedData = { ...formData };
      console.log(updatedData, "junaid");
      dispatch(setEditSectionLoading(true));
      
      if (formData?.image && formData?.image instanceof File) {
        console.log(formData, "junaid");
        const uploadedImageUrl = await uploadToCloudinary(formData.image);
        console.log(uploadedImageUrl, "junaid");
        updatedData.image = uploadedImageUrl;
      }
      await editSectionsData(updatedData, currUser?.brandName, section?._id, dispatch);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (section) {
      setFormData(section?.content);
    }
  }, [section]);

  if (!section) {
    return (
      <div className='flex w-full justify-center py-[75px] text-center text-textTC text-[18px]'>
        <p>There is no any Content At this page .</p>
      </div>
    )
  }


  return (
    <BackgroundFrame>

      <ActionCard
        actions={<Button label="Save" loading={editSectionLoading} className="w-max !bg-[black]" action={handleSubmit} />}
        lable={section.sectionName}
        className={'!px-5 !py-3'}
      >
        <div
          className={` border-[#c9c9c98f] shadow-[inset_0px_0px_12px_#dadada] p-[20px] h-[340px] overflow-y-auto customScroll flex flex-col`}
        >
          <div className='flex flex-col gap-3'>
            {renderComponents()}
          </div>
        </div>
      </ActionCard>
      <LivePreview>
        {SectionStructure[section?.type]?.component && formData &&
          React.createElement(SectionStructure[section?.type].component, { content: formData })
        }
      </LivePreview>
    </BackgroundFrame>
  )
}

export default ProtectedRoute(ContentEdit);