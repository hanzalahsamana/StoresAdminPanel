"use client";
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import HomeLayout from '@/components/Layout/HomeLayout';
import TemplateFooter from '@/components/Layout/TemplateFooter';
import TemplateHeader from '@/components/Layout/TemplateHeader';
import LivePreview from '@/components/UI/LivePreview';
import ThemeSelector from '@/components/Uploaders/ThemeSeletctor'
import React from 'react'

const Theme = () => {
  return (
    <div className='flex justify-center items-start flex-col md:flex-row'>
      <BackgroundFrame>
        <ThemeSelector />
      </BackgroundFrame>
      <LivePreview>
        <TemplateHeader/>
        <HomeLayout />
        <TemplateFooter/>
      </LivePreview>
    </div>
  )
}

export default ProtectedRoute(Theme)