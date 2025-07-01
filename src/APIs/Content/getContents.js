'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { setContentData, setContentDataLoading } from '@/Redux/ContentData/ContentDataSlice';
import { dispatch } from '@/Redux/Store';

export const getContents = async (storeId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getContents`);
    dispatch(setContentData(data?.data));
    return data?.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
    toast.error(msg);
  } finally {
    dispatch(setContentDataLoading(false));
  }
};
