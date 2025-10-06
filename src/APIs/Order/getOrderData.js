'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { orderLoading, setOrderData } from '@/Redux/Order/OrderSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { dispatch } from '@/Redux/Store';

export const fetchOrderData = async (token, storeId, orderId) => {
  try {
    dispatch(orderLoading(true));
    const response = await axios.get(`${BASE_URL}/${storeId}/getOrders?orderId=${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setOrderData(!Array.isArray(response.data.data) ? [response.data.data] : response.data.data));
    console.log('response?.data?.data', response?.data?.data);
    return response.data.data;
  } catch (error) {
    console.error(error?.response?.data?.message || error?.message || 'Something went wrong!');
  } finally {
    dispatch(orderLoading(false));
  }
};
