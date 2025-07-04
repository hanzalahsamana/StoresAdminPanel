"use client";

import React, { useEffect, useState } from 'react'
import "../../../../../components/UI/style.css";
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Button from '@/components/Actions/Button';
import ActionCard from '@/components/Cards/ActionCard';
import FormInput from '@/components/Forms/FormInput';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import FaqUploader from '@/components/Uploaders/FaqUploader';
import ImageUploader from '@/components/Uploaders/ImageUploader';
import TextEditor from '@/components/Uploaders/TextEditor';
import LivePreview from '@/components/UI/LivePreview';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectSectionByID } from '@/Redux/SectionsData/SectionsDataSlice';
import { SectionStructure } from '@/Structure/SectionStructure';
import DropDown from '@/components/Actions/DropDown';
import MultiSelectDropdown from '@/components/Actions/MultiSelectDropdown';
import { toast } from 'react-toastify';
import HomeLayout from '@/components/Layout/HomeLayout';
import TemplateHeader from '@/components/Layout/TemplateHeader';
import TemplateFooter from '@/components/Layout/TemplateFooter';
import Checkbox from '@/components/Actions/CheckBox';
import { uploadImagesToS3, uploadSingleImageToS3 } from '@/APIs/uploadImageS3';
import MultiImageUploader from '@/components/Uploaders/MultiImageUploader';
import IconButton from '@/components/Actions/IconButton';
import { CiUndo } from 'react-icons/ci';
import BackButton from '@/components/Actions/BackButton';
import { IsEqual } from '@/Utils/IsEqual';
import { editSection } from '@/APIs/SectionsData/editSection';
import { HTTP } from 'config';
import { Base_Domain } from 'config';




const ContentEdit = () => {

  const dispatch = useDispatch()
  const params = useParams()
  const section = useSelector((state) => selectSectionByID(state, params?.sectionid));
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { products } = useSelector((state) => state.productData);
  const { collections } = useSelector((state) => state.collection);
  const [isModified, setIsModified] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

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
            value={formData?.[name] ?? ""}
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
            size='XLarge'
            key={name}
            image={formData?.[name]}
            setImage={(image) => handleInputChange(name, image)}
          />
        );
      }
      if (input === "multiImageUploader") {
        return (
          <MultiImageUploader
            key={name}
            images={formData?.[name]}
            setImages={(images) => handleInputChange(name, images)}
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
            ? products.map((product) => ({ label: product?.name, value: product?._id }))
            : options === "collections"
              ? collections.map((Collection) => Collection?.slug)
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
      setLoading(true);
      let updatedData = { ...formData };

      if (formData?.image && formData?.image instanceof File) {
        const uploadedImageUrl = await uploadSingleImageToS3(currUser?.token, store?._id, formData.image);
        updatedData.image = uploadedImageUrl;
      }

      if (formData?.imagesUrl && Array.isArray(formData.imagesUrl)) {
        const existingUrls = formData.imagesUrl.filter(image => typeof image === "string");
        const imagesToUpload = formData.imagesUrl.filter(image => image instanceof File);

        if (imagesToUpload.length > 0) {
          const uploadedImagesUrls = await uploadImagesToS3(currUser?.token, store?._id, imagesToUpload);
          updatedData.imagesUrl = [...existingUrls, ...uploadedImagesUrls];
        } else {
          updatedData.imagesUrl = existingUrls;
        }
      }

      await editSection(currUser?.token, store?._id, section?._id, updatedData);
      toast.success("Section updated successfully!");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (section) {
      setFormData(section?.content);
    }
  }, [section]);

  useEffect(() => {
    setIsModified(!IsEqual(section?.content, formData));
  }, [formData, section]);

  if (!section) {
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
                action={() => setFormData(section?.content)}
              />
              <BackButton link={"/design"} />
            </>}
          actionPosition='top'
          label={section.sectionName}
          className={'!h-[calc(100vh-92px)]'}
        >
          <div
            className={`border-t px-[8px] py-[20px] border-[#c9c9c98f] h-full overflow-y-auto customScroll flex flex-col`}
          >
            <div className='flex flex-col gap-3'>
              {renderComponents()}
            </div>
          </div>
        </ActionCard>
      </BackgroundFrame>
      <LivePreview extraAction={(
        <div
          className='cursor-pointer flex items-center justify-center rounded-full mr-[10px] text-[14px]'>
          <Checkbox isChecked={checked} setIsCheck={setChecked} label={checked ? 'Full Page' : 'Editing Section'} />
        </div>
      )}>
        <TemplateHeader />
        {checked ? (
          SectionStructure[section?.type]?.component && formData &&
          React.createElement(SectionStructure[section?.type].component, { content: formData })
        ) : (
          <HomeLayout overrideSectionId={section?._id} formData={formData} />
        )}
        <TemplateFooter />
      </LivePreview>
    </div>
  )
}

export default ContentEdit;