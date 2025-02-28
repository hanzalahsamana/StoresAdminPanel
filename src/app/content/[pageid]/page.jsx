"use client";
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import React from 'react'

const ContentEdit = () => {
  return (
    <div className='flex w-full justify-center py-[75px] text-center text-textTC text-[18px]'>
        <p>We are working on it currently, Thankyou</p>
    </div>
  )
}

export default ProtectedRoute(ContentEdit);