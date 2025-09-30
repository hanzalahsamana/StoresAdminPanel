"use client";

import { getAllPages } from '@/APIs/Pages/Page';
import Button from '@/components/Actions/Button'
import IconButton from '@/components/Actions/IconButton';
import ImgToIcon from '@/components/Actions/ImgToIcon'
import ActionCard from '@/components/Cards/ActionCard'
import CustomCard from '@/components/Cards/CustomCard'
import BackgroundFrame from '@/components/Layout/BackgroundFrame'
import Loader from '@/components/Loader/loader';
import AddPageModal from '@/components/Modals/AddPageModal';
import DynamicDataSelectorModal from '@/components/Modals/DynamicDataSelectorModal';
import { ScrollShadows, useScrollShadow } from '@/Hooks/useScrollShadow';
import { ecommercePages } from '@/Structure/DefaultStructures'
import { formatRelativeTime } from '@/Utils/Formaters';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Base_Domain, HTTP } from './../../../../../config';

const page = () => {
  const { scrollRef, showTopShadow, showBottomShadow } = useScrollShadow([ecommercePages]);
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { pages, pagesLoading } = useSelector((state) => state.pages);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);




  const router = useRouter()

  const fetchData = async () => {
    await getAllPages(currUser?.token, store?._id);
  };

  useEffect(() => {
    const storeId = store?._id;
    if (!storeId || (pages && pages.length > 0)) return;

    fetchData();
  }, [store?._id, pages]);

  if (pagesLoading) {
    return <Loader />
  }

  const systemPages = pages.filter(page => page.type === 'system');
  const customPages = pages.filter(page => page.type === 'custom');


  return (
    <BackgroundFrame className="h-full">
      <ActionCard
        icon={<ImgToIcon url={'https://img.icons8.com/fluency/48/terms-and-conditions.png'} />}
        label={'Pages'}
        subText={'Customize your Pages'}
        className="sticky top-0 z-10 bg-white pb-2"
        actionPosition='top'
        actions={<>
          <Button label='Create Page' size='small' variant='black' action={() => { setIsOpen(true) }} />
        </>}
      />

      <div className="flex-1 relative min-h-0">
        <div ref={scrollRef} className="overflow-y-auto customScroll h-full space-y-4 pr-2">

          {systemPages.length > 0 && (
            <>
              <p className="text-[20px] font-semibold text-textC">System Pages</p>
              {systemPages.map((page) => (
                <CustomCard
                  key={page._id}
                  title={page.name}
                  subText={`Last Updated: ${formatRelativeTime(page?.updatedAt)}`}
                  actions={
                    <div className="flex items-center gap-3">
                      <Button
                        label="View Page"
                        size="small"
                        variant="text"
                        icon={<FaExternalLinkAlt />}
                        iconPosition="right"
                        action={() => window.open(`${HTTP}${store?.subDomain}.${Base_Domain}${page.slug}`, '_blank')}
                      />
                      {/* <IconButton
                        icon={<IoEyeOutline />}
                        tooltipLabel={'Hide Page'}
                        className={'text-textTC !text-[22px] hover:opacity-60'}
                      /> */}
                      <Button
                        label="Customize"
                        size="small"
                        action={() => router.push(`pages/customize?page=${page.slug}`)}
                      />
                    </div>
                  }
                />
              ))}
            </>
          )}

          {customPages.length > 0 && (
            <>
              <p className="text-[20px] font-semibold text-textC">Custom Pages</p>
              {customPages.map((page) => (
                <CustomCard
                  key={page._id}
                  title={page.name}
                  subText={`Last Updated: ${formatRelativeTime(page?.updatedAt)}`}
                  actions={
                    <div className="flex items-center gap-3">
                      <Button
                        label="View Page"
                        size="small"
                        variant="text"
                        icon={<FaExternalLinkAlt />}
                        iconPosition="right"
                        action={() => window.open(`${HTTP}${store?.subDomain}.${Base_Domain}${page?.slug}`, '_blank')}
                      />
                      {/* <IconButton
                        icon={<IoEyeOutline />}
                        tooltipLabel={'Hide Page'}
                        className={'text-textTC !text-[22px] hover:opacity-60'}
                      /> */}
                      <IconButton
                        icon={<AiOutlineDelete />}
                        tooltipLabel={'Delete Page'}
                        className={'text-textTC !text-[22px] hover:text-red-500'}
                      />
                      <Button
                        label="Customize"
                        size="small"
                        action={() => router.push(`pages/customize?page=${page.slug}`)}
                      />
                    </div>
                  }
                />
              ))}
            </>
          )}
        </div>

        <AddPageModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <ScrollShadows
          showTopShadow={showTopShadow}
          showBottomShadow={showBottomShadow}
        />
      </div>
    </BackgroundFrame >

  )
}

export default page