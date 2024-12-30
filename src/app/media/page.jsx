"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import React from 'react'

const Media = () => {
  return (
    <div>Media</div>
  )
}

export default ProtectedRoute(Media)