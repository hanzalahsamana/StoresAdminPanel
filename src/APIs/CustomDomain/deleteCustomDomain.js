'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { addProductData } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const deleteCustomDomain = async (token, storeId) => {
  try {
    const response = await axios.delete(`${Base_URL}/${storeId}/deleteCustomDomain`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
