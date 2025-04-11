"use client";

import React, { useEffect, useState } from 'react'
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
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectSectionByID, setEditSectionLoading } from '@/Redux/SectionsData/SectionsDataSlice';
import { SectionStructure } from '@/Structure/SectionStructure';
import DropDown from '@/components/Actions/DropDown';
import MultiSelectDropdown from '@/components/Actions/MultiSelectDropdown';
import { editSectionsData } from '@/APIs/SectionsData/editSectionsData';
import { toast } from 'react-toastify';
import _ from "lodash";
import HomeLayout from '@/components/Layout/HomeLayout';
import TemplateHeader from '@/components/Layout/TemplateHeader';
import TemplateFooter from '@/components/Layout/TemplateFooter';
import Checkbox from '@/components/Actions/CheckBox';
import { uploadImagesToS3, uploadSingleImageToS3 } from '@/APIs/uploadImageS3';
import MultiImageUploader from '@/components/Uploaders/MultiImageUploader';
import IconButton from '@/components/Actions/IconButton';
import { CiUndo } from 'react-icons/ci';
import BackButton from '@/components/Actions/BackButton';




const ContentEdit = () => {

  const dispatch = useDispatch()
  const params = useParams()
  const { currUser } = useSelector((state) => state.currentUser);
  const section = useSelector((state) => selectSectionByID(state, params?.sectionid));
  const { products } = useSelector((state) => state.productData);
  const { categories } = useSelector((state) => state.categories);
  const { editSectionLoading } = useSelector((state) => state.sectionsData);
  const [isModified, setIsModified] = useState(false);
  const [checked, setChecked] = useState(true);

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
      let updatedData = { ...formData };
      console.log(updatedData, "junaid");
      dispatch(setEditSectionLoading(true));

      if (formData?.image && formData?.image instanceof File) {
        console.log(formData, "junaid");
        const uploadedImageUrl = await uploadSingleImageToS3(currUser?.brandName, formData.image);
        console.log(uploadedImageUrl, "junaid");
        updatedData.image = uploadedImageUrl;
      }
      if (formData?.imagesUrl && Array.isArray(formData.imagesUrl)) {
        const existingUrls = formData.imagesUrl.filter(image => typeof image === "string");
        const imagesToUpload = formData.imagesUrl.filter(image => image instanceof File);

        if (imagesToUpload.length > 0) {
          const uploadedImagesUrls = await uploadImagesToS3(currUser?.brandName, imagesToUpload);
          console.log("Uploaded image URLs:", uploadedImagesUrls);
          updatedData.imagesUrl = [...existingUrls, ...uploadedImagesUrls];
        } else {
          updatedData.imagesUrl = existingUrls;
        }
      }


      await editSectionsData(updatedData, currUser?.brandName, section?._id, dispatch);
      dispatch(setEditSectionLoading(false));
      toast.success("Form submitted successfully!");
    } catch (error) {
      dispatch(setEditSectionLoading(false));
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (section) {
      setFormData(section?.content);
    }
  }, [section]);

  useEffect(() => {
    console.log(section?.content, formData, "././././");

    setIsModified(!_.isEqual(section?.content, formData));
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
              <Button size='small' active={isModified} label="Save" loading={editSectionLoading} variant='black' className="w-max" action={handleSubmit} />
              <IconButton
                icon={<CiUndo />}
                tooltipLabel={'discard'}
                className={` !text-[22px] ${isModified ? 'text-black' : 'text-[#4f4c4c89] !cursor-not-allowed'}`}
                action={() => setFormData(section?.content)}
              />
              <BackButton link={"/design"} />
            </>}
          actionPosition='top'
          lable={section.sectionName}
          className={'!px-5 !py-3 !h-[calc(100vh-92px)]'}
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

export default ProtectedRoute(ContentEdit);