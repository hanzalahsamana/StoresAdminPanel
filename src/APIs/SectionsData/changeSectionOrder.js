'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { setSectionsData } from '@/Redux/SectionsData/SectionsDataSlice';
import { dispatch } from '@/Redux/Store';

export const changeSectionOrder = async (token, storeId, sectionId, newOrder) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/${storeId}/changeSectionOrder?sectionId=${sectionId}`,
      { newOrder },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch(setSectionsData(data.sections));
    return data;
  } catch (error) {
    throw error;
  }
};
