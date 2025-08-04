'use client';

import axios from 'axios';
import Base_URL from '../../../config';

export const addProducts = async (token, storeId, data) => {
  try {
    const response = await axios.post(`${Base_URL}/${storeId}/addProduct`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
