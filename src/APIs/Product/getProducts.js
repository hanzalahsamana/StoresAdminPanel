'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { setProductData, setProductLoading } from '@/Redux/Product/ProductSlice';
import { dispatch } from '@/Redux/Store';

export const getProducts = async (storeId, page = 1, limit = 10, filter = {}) => {
  try {
    let queryParams = [];

    if (page != null) queryParams.push(`page=${page}`);
    if (limit != null) queryParams.push(`limit=${limit}`);

    if (filter && typeof filter === 'object') {
      Object.keys(filter).forEach((key) => {
        if (filter[key] !== undefined && filter[key] !== null && filter[key] !== '') {
          queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`);
        }
      });
    }

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getProducts${queryString}`);
    return data?.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
    toast.error(msg);
  }
};
