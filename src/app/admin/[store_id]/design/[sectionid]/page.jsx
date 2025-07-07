"use client";

import React, { useEffect, useState } from 'react'
import "../../../../../components/UI/style.css";
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
import MultiImageUploader from '@/components/Uploaders/MultiImageUploader';
import IconButton from '@/components/Actions/IconButton';
import { CiUndo } from 'react-icons/ci';
import BackButton from '@/components/Actions/BackButton';
import { IsEqual } from '@/Utils/IsEqual';
import { editSection } from '@/APIs/SectionsData/editSection';
import { convertImageBlobsToUrlsPreview, convertImageBlobsToUrlsPublish } from '@/Utils/ConvertImageBlobsToUrls';
import LivePreviewIframe from '@/components/UI/LivePreviewIframe';
import { ScrollShadows, useScrollShadow } from '@/Hooks/useScrollShadow';




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
  const { scrollRef, showTopShadow, showBottomShadow } = useScrollShadow([section]);

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
            label={placeholder}
            layout='label'
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
            label={'Description'}
            className={'!w-[500px] scale-[0.58] origin-top-left'}
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
            size='large'
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
            label={placeholder}
            layout={'label'}
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
      const updatedData = convertImageBlobsToUrlsPublish(currUser?.token, store?._id, formData);
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
    <div className="flex w-full ">
      {/* <BackgroundFrame> */}

      <ActionCard
        actions={
          <>
            <IconButton
              icon={<CiUndo />}
              tooltipLabel={'discard'}
              className={` !text-[22px] ${isModified ? 'text-black' : 'text-[#4f4c4c89] !cursor-not-allowed'}`}
              action={() => setFormData(section?.content)}
            />
            <Button size='small' active={isModified} label="Save" loading={loading} variant='black' className="w-max" action={handleSubmit} />
            {/* <BackButton link={`/admin/${store._id}/design`} /> */}
          </>}
        actionPosition='bottom'
        label={formData?.title || section?.sectionName}
        className={'!h-[calc(100vh-60px)] min-h-0 !border-y-0 border-l-0 !p-3 rounded-e-2xl rounded-s-none !w-[350px]'}
      >
        <div
          className='relative min-h-0'>
          <div
            ref={scrollRef}
            className={`border-y px-[8px] py-[20px] border-[#c9c9c98f] h-full overflow-y-auto customScroll flex flex-col gap-3`}
          >
            {renderComponents()}
          </div>
          <ScrollShadows
            showTopShadow={showTopShadow}
            showBottomShadow={showBottomShadow}
          />
        </div>
      </ActionCard>


      {/* </BackgroundFrame> */}

      {/* <iframe className='' src='/admin/68416a1bd4645140e49c62d8/design/68416a20d4645140e49c62f9'></iframe> */}
        <div
        className=' flex-1 overflow-hidden'
        >
          <LivePreviewIframe
            previewData={{
              formData: convertImageBlobsToUrlsPreview(formData),     // your updatedFormData
              previewComponent: { ...section, component: "section" },      // current section object
              checked       // boolean — whether rendering single component or whole layout
            }}
          />
        </div>
      {/* <LivePreview extraAction={(
        <div
          className='cursor-pointer flex items-center justify-center rounded-full mr-[10px] text-[14px]'>
          <Checkbox isChecked={checked} setIsCheck={setChecked} label={checked ? 'Show only editing page' : 'Show only editing page'} />
        </div>
      )}>
        <TemplateHeader />

        {(() => {
          const updatedFormData = convertImageBlobsToUrlsPreview(formData);

          return checked ? (
            SectionStructure[section?.type]?.component && updatedFormData &&
            React.createElement(SectionStructure[section?.type].component, {
              content: updatedFormData,
            })
          ) : (
            <HomeLayout overrideSectionId={section?._id} formData={updatedFormData} />
          );
        })()}

        <TemplateFooter />

      </LivePreview> */}
    </div>
  )
}

export default ContentEdit;