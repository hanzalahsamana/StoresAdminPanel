'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { addCollection } from '@/Redux/Collection/CollectionSlice';
import { dispatch } from '@/Redux/Store';

export const addCollectionApi = async (token, storeId, payload) => {
  try {
    const apiUrl = `${Base_URL}/${storeId}/addCollection`;
    const { data } = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addCollection(data?.data));
    return data?.data;
  } catch (error) {
    throw error;
  }
};
