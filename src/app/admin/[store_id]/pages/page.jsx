"use client";

import Button from '@/components/Actions/Button'
import ImgToIcon from '@/components/Actions/ImgToIcon'
import ToggleSwitch from '@/components/Actions/ToggleSwitch';
import ActionCard from '@/components/Cards/ActionCard'
import CustomCard from '@/components/Cards/CustomCard'
import BackgroundFrame from '@/components/Layout/BackgroundFrame'
import { ScrollShadows, useScrollShadow } from '@/Hooks/useScrollShadow';
import { ecommercePages } from '@/Structure/DefaultStructures'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

const page = () => {
  const { scrollRef, showTopShadow, showBottomShadow } = useScrollShadow([ecommercePages]);

  return (
    <BackgroundFrame className="h-full">
      <ActionCard
        icon={<ImgToIcon url={'https://img.icons8.com/fluency/48/terms-and-conditions.png'} />}
        label={'Pages'}
        subText={'Customize your Pages'}
        className="sticky top-0 z-10 bg-white pb-2"
      />
      <div className="flex-1 relative min-h-0">
        <div ref={scrollRef} className="overflow-y-auto customScroll h-full  space-y-4 pr-2">
          {ecommercePages.map((page) => (
            <CustomCard
              key={page.key}
              title={page.title}
              subText={page.subText}
              icon={page.icon}
              actions={
                <div className="flex gap-3">
                  <ToggleSwitch
                    label='Draft'
                  />
                  <Button
                    label="View Page"
                    size="small"
                    variant="text"
                    icon={<FaExternalLinkAlt />}
                    iconPosition="right"
                    onClick={() => window.open(page.viewPath, '_blank')}
                  />
                  <Button
                    label="Customize"
                    size="small"
                    onClick={() => router.push(page.editPath)}
                  />
                </div>
              }
            />
          ))}
        </div>
        <ScrollShadows
          showTopShadow={showTopShadow}
          showBottomShadow={showBottomShadow}
        />
      </div>
    </BackgroundFrame>

  )
}

export default page