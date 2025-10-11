'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { dispatch } from '@/Redux/Store';
import { setStoreBranding } from '@/Redux/Store/StoreDetail.slice';
import { deleteStoreFromRedux } from '@/Redux/AllStores/AllStoreSlice';
import { toast } from 'react-toastify';

export const deleteStore = async (token, storeId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${storeId}/delete/store`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    dispatch(deleteStoreFromRedux(storeId));
    return data;
  } catch (error) {
    throw error;
  }
};
