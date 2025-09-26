'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { setProductData, setProductLoading } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const getSingleProduct = async (storeId, slug) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/products/single-product?slug=${slug}`);
    return data?.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
    toast.error(msg);
  }
};
