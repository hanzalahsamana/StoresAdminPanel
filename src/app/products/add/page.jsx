"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import ActionCard from '@/components/Cards/ActionCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import AddEditProductModal from '@/components/Modals/AddEditProductModal';
import React, { useState } from 'react'

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <BackgroundFrame>
      <AddEditProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </BackgroundFrame>
  )
}

export default ProtectedRoute(AddProduct);