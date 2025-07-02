'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { updateCollection } from '@/Redux/Collection/CollectionSlice';
import { dispatch } from '@/Redux/Store';

export const editCollectionApi = async (token, storeId, collectionId, payload) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/${storeId}/editCollection?collectionId=${collectionId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(updateCollection(data.data));
    return data.data;
  } catch (error) {
    throw error;
  }
};
