"use client";

import React, { useEffect, useRef, useState } from 'react'
import "../../../../../components/UI/style.css";
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectSectionByID } from '@/Redux/SectionsData/SectionsDataSlice';
import { toast } from 'react-toastify';
import { editSection } from '@/APIs/SectionsData/editSection';
import { convertImageBlobsToUrlsPreview, convertImageBlobsToUrlsPublish } from '@/Utils/ConvertImageBlobsToUrls';
import LivePreviewIframe from '@/components/UI/LivePreviewIframe';
import { Tooltip } from 'react-tooltip';

import BuilderHeader from '@/components/Layout/BuilderHeader';
import BuilderCustomizer from '@/components/Cards/BuilderCustomizer';


const ContentEdit = () => {

  const dispatch = useDispatch()
  const params = useParams()
  const { sectionsData } = useSelector((state) => state.sectionsData);

  const section = useSelector((state) => selectSectionByID(state, '68416a20d4645140e49c62f9'));
  const [section2, setSection2] = useState({})
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { products } = useSelector((state) => state.productData);
  const { collections } = useSelector((state) => state.collection);
  const { selectedDevicePreview } = useSelector((state) => state.livePreview);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const formData = {}

  // const { scrollRef, showTopShadow, showBottomShadow } = useScrollShadow([section]);

  const [customizePageData, setCustomizePageData] = useState({});









  useEffect(() => {
    console.log(customizePageData, "☠️☠️☠️☠️☠️☠️");
  }, [customizePageData]);

  useEffect(() => {
    const handleIframeMessage = (e) => {
      if (e.data?.type === 'SECTION_SELECTED') {
        const sectionId = e.data.payload
        const selectedSection = customizePageData?.sections?.find((section) => section?._id === sectionId)
        setActiveSection(selectedSection);
        // optionally scroll to it in your builder sidebar
      }
    };

    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, []);
  // useEffect(() => {
  //   setIsModified(!IsEqual(section?.content, formData));
  // }, [formData, section]);


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

  return (
    <div className='flex flex-col w-full'>
      <BuilderHeader />
      <div className="flex w-full  ">

        <BuilderCustomizer customizePageData={customizePageData} setCustomizePageData={setCustomizePageData} activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className=' flex-1 overflow-hidden w-full min-h-full bg-lbgC'>
          <LivePreviewIframe
            selectedDevicePreview={selectedDevicePreview}
            previewData={{
              formData: convertImageBlobsToUrlsPreview(formData),
              previewComponent: { ...customizePageData },
              activeSectionId: activeSection?._id,
              checked: false,
            }}
          />
        </div>

        <Tooltip id='customize' place="top" className="!text-[12px] z-[200] " />
      </div >
    </div >
  )
}

export default ContentEdit;