'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { dispatch } from '@/Redux/Store';
import { deleteStoreFromRedux } from '@/Redux/AllStores/AllStoreSlice';
import { toast } from 'react-toastify';

export const deleteStore = async (token, storeId, password) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${storeId}/delete/store?password=${password}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(deleteStoreFromRedux(storeId));
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message || 'Something went wrong!');
  }
};
