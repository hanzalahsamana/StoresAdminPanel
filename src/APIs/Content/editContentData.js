'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { updateContentData } from '@/Redux/ContentData/ContentDataSlice';
import { dispatch } from '@/Redux/Store';

export const editContentData = async (token, storeId, contentId, payload) => {
  try {
    const { data } = await axios.patch(`${BASE_URL}/${storeId}/editContent?contentId=${contentId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(updateContentData(data.data));
    return data.data;
  } catch (error) {
    throw error;
  }
};
