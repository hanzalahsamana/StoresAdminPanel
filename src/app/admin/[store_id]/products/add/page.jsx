'use client';

import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import AddEditProductModal from '@/components/Modals/AddEditProductModal';
import React, { useState } from 'react';

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(true);
  return <AddEditProductModal isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export default AddProduct;
