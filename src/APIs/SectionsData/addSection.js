'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { setSectionsData } from '@/Redux/SectionsData/SectionsDataSlice';
import { dispatch } from '@/Redux/Store';

export const addSection = async (token, storeId, data) => {
  try {
    const apiUrl = `${Base_URL}/${storeId}/addSection`;
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setSectionsData(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
