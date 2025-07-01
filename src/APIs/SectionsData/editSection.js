'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { updateSectionsData } from '@/Redux/SectionsData/SectionsDataSlice';
import { dispatch } from '@/Redux/Store';

export const editSection = async (token, storeId, sectionId, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${storeId}/editSection?sectionId=${sectionId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(updateSectionsData(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
