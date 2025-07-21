"use client";

import React, { useEffect, useState } from 'react'
import "../../../../../components/UI/style.css";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LivePreviewIframe from '@/components/UI/LivePreviewIframe';
import { Tooltip } from 'react-tooltip';
import BuilderHeader from '@/components/Layout/BuilderHeader';
import BuilderCustomizer from '@/components/Cards/BuilderCustomizer';
import { IsEqual } from '@/Utils/IsEqual';
import { getDraftPage, publishPage, saveDraftPage } from '@/APIs/Pages/Page';
import BuilderLoader from '@/components/Loader/BuilderLoader';
import { useRouter, useSearchParams } from 'next/navigation';


const ContentEdit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSlug = searchParams.get("page");

  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { editingPage } = useSelector((state) => state.pages);
  const [isModified, setIsModified] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);

  const [customizePageData, setCustomizePageData] = useState(null);


  useEffect(() => {
    console.log(customizePageData, "☠️☠️☠️☠️☠️☠️");
  }, [customizePageData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        const data = await getDraftPage(currUser?.token, store?._id, pageSlug);
        setCustomizePageData(data?.data);
        setCurrentMode(data?.mode)
      } catch (error) {
        toast.error(error.response ? error.response.data.message : error.message)
      } finally {
        setFetchLoading(false);
      }
    };

    store?._id && pageSlug && fetchData();
  }, [store?._id, pageSlug]);

  useEffect(() => {
    if (editingPage && customizePageData) {
      setIsModified(!IsEqual(editingPage, customizePageData));
    }
  }, [editingPage, customizePageData]);


  const handlePublishPage = async () => {
    try {
      setLoading(true);
      await publishPage(currUser?.token, store?._id, customizePageData);
      toast.success("Page updated successfully!");
      setCurrentMode('published')
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraftPage = async () => {
    try {
      setLoading(true);
      await saveDraftPage(currUser?.token, store?._id, customizePageData);
      toast.success("Section updated successfully!");
      setCurrentMode('draft')
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pageSlug) {
      router.push("../pages");
    }
  }, [pageSlug]);


  if (fetchLoading) {
    return <BuilderLoader />
  }

  return (
    <div className='flex flex-col w-full'>
      <BuilderHeader isModified={isModified} handlePublishPage={handlePublishPage} handleSaveDraftPage={handleSaveDraftPage} loading={loading} currentMode={currentMode} />
      <div className="flex w-full  ">

        <BuilderCustomizer customizePageData={customizePageData} setCustomizePageData={setCustomizePageData} activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className=' flex-1 overflow-hidden w-full min-h-full bg-lbgC'>
          <LivePreviewIframe
            previewData={{
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