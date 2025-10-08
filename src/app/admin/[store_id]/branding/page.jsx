"use client";
import React from 'react'
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import ThemeEditBlock from '@/components/Modals/ThemeEditBlock';

const Branding = () => {

  return (
    <BackgroundFrame className='max-h-full h-full overflow-hidden'>
      <ThemeEditBlock className="!max-h-full !h-full flex-1 min-h-0" />
    </BackgroundFrame>
  )
}

export default Branding;