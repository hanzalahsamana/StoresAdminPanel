'use client';

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import AddEditProductModal from '@/components/Modals/AddEditProductModal';
import { use, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getProducts } from '@/APIs/Product/getProducts';
import { setProductData, setProductLoading } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

const EditProduct = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [editingProduct, setEditingProduct] = useState({});
  const { productid, store_id } = useParams();

  const fetchProduct = async () => {
    const product = await getProducts(store_id, 1, 0, { productIds: [productid] });
    setEditingProduct(product[0]);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return <AddEditProductModal updatedData={editingProduct} isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export default EditProduct;
