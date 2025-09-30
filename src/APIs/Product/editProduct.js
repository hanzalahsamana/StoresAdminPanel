'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { setProductLoading, updateProductData } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const editProductData = async (data, storeId, id, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${storeId}/editProduct?id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response.data===>', response.data);
    dispatch(updateProductData(response.data.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
