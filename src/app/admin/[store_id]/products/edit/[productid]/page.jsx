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
  const [editingProduct, seteditingProduct] = useState({});
  const { productid, store_id } = useParams();
  const { products } = useSelector((state) => state.productData);

  const fetchProduct = async () => {
    try {
      dispatch(setProductLoading(true));
      const products = await getProducts(store_id);
      dispatch(setProductData(products));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const EditingProduct = products?.find((product) => product._id === productid);

      seteditingProduct(EditingProduct);
    }
  }, [products]);
  return <AddEditProductModal updatedData={editingProduct} isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export default EditProduct;
