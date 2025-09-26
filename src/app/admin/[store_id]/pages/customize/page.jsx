"use client";

import React, { useCallback, useEffect, useState } from 'react'
import "../../../../../components/UI/style.css";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LivePreviewIframe from '@/components/UI/LivePreviewIframe';
import { Tooltip } from 'react-tooltip';
import BuilderHeader from '@/components/Layout/BuilderHeader';
import BuilderCustomizer from '@/components/Cards/BuilderCustomizer';
import { IsEqual } from '@/Utils/IsEqual';
import { discardDraft, getAllPages, getDraftPage, publishPage, saveDraftPage } from '@/APIs/Pages/Page';
import BuilderLoader from '@/components/Loader/BuilderLoader';
import { useRouter, useSearchParams } from 'next/navigation';
import useConfirm from '@/Hooks/useConfirm';
import DynamicDataSelectorModal from '@/components/Modals/DynamicDataSelectorModal';


const ContentEdit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSlug = searchParams.get("page");

  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { editingPage, editingPageMode } = useSelector((state) => state.pages);
  const [isModified, setIsModified] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);
  const [customizePageData, setCustomizePageData] = useState(null);
  const { pages } = useSelector((state) => state.pages);

  const { confirm, ConfirmationModal } = useConfirm();

  const fetchInitialDraftData = async () => {
    try {
      setFetchLoading(true);
      await getDraftPage(currUser?.token, store?._id, pageSlug);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
    } finally {
      setFetchLoading(false);
    }
  };

  const handlePublishPage = async () => {
    try {
      if (currentMode === 'draft') {
        const ok = await confirm(
          "Publish All Draft Work",
          "Are you sure you want to publish all your draft changes? This action will overwrite the published version and discard any unsaved draft work.",
          "Cancel",
          "Yes, Publish"
        );
        if (!ok) return;
      }
      setLoading(true);
      await publishPage(currUser?.token, store?._id, customizePageData);
      toast.success("Page updated successfully!");
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
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscardDraft = async () => {
    try {
      const ok = await confirm("Switch to Published?", "Are you sure you want to discard this page? This will remove your work of draft version.", "No, remain here", "Yes, Discard it");
      if (!ok) return;
      setFetchLoading(true);
      await discardDraft(currUser?.token, store?._id, pageSlug);
      toast.success("Page Discard successfully!");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setFetchLoading(false);
    }
  }

  // useEffect(() => {
  //   let nextUrl = null;

  //   const originalPush = router.push;
  //   const patchedPush = async (url) => {
  //     if (!isModified) {
  //       originalPush(url);
  //       return;
  //     }

  //     const shouldLeave = await confirm();
  //     if (shouldLeave) {
  //       originalPush(url);
  //     } else {
  //       nextUrl = null;
  //     }
  //   };

  //   router.push = patchedPush;

  //   const handleBeforeUnload = (e) => {
  //     if (isModified) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   };

  //   const handlePopState = async (e) => {
  //     if (!isModified) return;

  //     const shouldLeave = await confirm();
  //     if (!shouldLeave) {
  //       history.forward();
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("popstate", handlePopState);
  //     router.push = originalPush;
  //   };
  // }, [isModified, confirm, router]);

  useEffect(() => {
    if (store?._id && pageSlug) {
      fetchInitialDraftData();
    }
  }, [store?._id, pageSlug]);

  useEffect(() => {
    if (!pageSlug) {
      router.push("../pages");
    }
  }, [pageSlug]);

  useEffect(() => {
    if (editingPage && customizePageData) {
      setIsModified(!IsEqual(editingPage, customizePageData));
    }
  }, [editingPage, customizePageData]);

  useEffect(() => {
    setCustomizePageData(editingPage)
    setCurrentMode(editingPageMode)
  }, [editingPage, editingPageMode])

  const fetchData = async () => {
    await getAllPages(currUser?.token, store?._id);
  };

  useEffect(() => {
    const storeId = store?._id;
    if (!storeId || (pages && pages.length > 0)) return;

    fetchData();
  }, [store?._id, pages]);


  useEffect(() => {
    console.log(customizePageData, "Customizeeeee");
  }, [customizePageData]);

  if (fetchLoading) {
    return <BuilderLoader />
  }

  return (
    <div className='flex flex-col w-full'>
      <BuilderHeader isModified={isModified} handlePublishPage={handlePublishPage} handleSaveDraftPage={handleSaveDraftPage} handleDiscardDraft={handleDiscardDraft} loading={loading} currentMode={currentMode} />
      <div className="flex w-full  ">

        <BuilderCustomizer customizePageData={customizePageData} setCustomizePageData={setCustomizePageData} activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className=' flex-1 overflow-hidden w-full min-h-full bg-lbgC'>
          <LivePreviewIframe
            previewData={{
              previewComponent: { ...customizePageData },
              activeSectionId: activeSection?._id,
              branding: store?.branding || null
            }}
          />
        </div>

        <Tooltip id='customize' place="top" className="!text-[12px] z-[200] " />
        {ConfirmationModal}
      </div >
    </div >
  )
}

export default ContentEdit;