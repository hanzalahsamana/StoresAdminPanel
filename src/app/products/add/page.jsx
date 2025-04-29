"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
<<<<<<< HEAD
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
=======
import React from 'react'

const AddProduct = () => {
  return (
    <div>AddProduct</div>
>>>>>>> a8e931313f66425d67fa742a8ef53733213bb270
  )
}

export default ProtectedRoute(AddProduct);