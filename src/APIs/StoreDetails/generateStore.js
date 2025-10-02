'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { dispatch } from '@/Redux/Store';
import { setGenratedStore } from '@/Redux/AllStores/AllStoreSlice';

export const generateStore = async (token, payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/generateStore`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setGenratedStore(data?.data));
    toast.success('Store generated successfully!');

    return data.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error?.message || 'something went wrong';
    toast.error(msg);
  }
};
