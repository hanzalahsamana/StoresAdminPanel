"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import ActionCard from '@/components/Cards/ActionCard';
import ProductDetailCard from '@/components/Cards/productDetailCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import AddEditProductModal from '@/components/Modals/AddEditProductModal';
import LivePreview from '@/components/UI/LivePreview';
import React, { useState } from 'react'

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='flex justify-center items-start flex-col md:flex-row'>
      <BackgroundFrame>
        <AddEditProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </BackgroundFrame>
      <LivePreview>
        <ProductDetailCard product={{}} />
      </LivePreview>
    </div>
  )
}

export default ProtectedRoute(AddProduct);