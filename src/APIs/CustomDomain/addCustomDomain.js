'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { addProductData } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const addCustomDomain = async (token, storeId, payload) => {
  try {
    const response = await axios.post(`${Base_URL}/${storeId}/addCustomDomain`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
