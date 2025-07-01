'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { setSectionsData } from '@/Redux/SectionsData/SectionsDataSlice';
import { dispatch } from '@/Redux/Store';

export const deleteSection = async (token, storeId, sectionId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${storeId}/deleteSection?sectionId=${sectionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setSectionsData(response?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
