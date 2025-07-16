'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { setProductData, setProductLoading } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const getProducts = async (storeId, page = 1, limit = 10, filter) => {
  try {
    let queryParams = [];
    if (page !== undefined && page !== null) queryParams.push(`page=${page}`);
    if (limit !== undefined && limit !== null) queryParams.push(`limit=${limit}`);
    if (filter !== undefined && filter !== null && filter !== '') queryParams.push(`filter=${encodeURIComponent(filter)}`);
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    const { data } = await axios.get(`${BASE_URL}/${storeId}/getProducts${queryString}`);
    dispatch(setProductData(data?.data));
    return data?.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
    toast.error(msg);
  } finally {
    dispatch(setProductLoading(false));
  }
};
