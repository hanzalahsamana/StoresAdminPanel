'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { addProductData } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const addProducts = async (token, storeId, data) => {
  try {
    const response = await axios.post(`${Base_URL}/${storeId}/addProduct`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addProductData(response?.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
