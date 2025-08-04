'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { dispatch } from '@/Redux/Store';
import { setStore, setStoreLoading } from '@/Redux/Store/StoreDetail.slice';

export const getStore = async (storeId) => {
  dispatch(setStoreLoading(true));

  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getStore`);
    dispatch(setStore(data?.data));
    return data?.data;
  } catch (error) {
    dispatch(setStore({}));
    const msg = error?.response?.data?.message || error?.message || 'something went wrong.';
    console.error(msg);
  } finally {
    dispatch(setStoreLoading(false));
  }
};