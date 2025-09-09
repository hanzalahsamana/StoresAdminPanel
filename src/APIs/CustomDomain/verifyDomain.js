'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { addProductData } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const verifyDomain = async (token, storeId, domain) => {
  try {
    const response = await axios.get(`${Base_URL}/${storeId}/checkDomainStatus?domain=${domain}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
