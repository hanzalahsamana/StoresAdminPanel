'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { updateSubscriptionStatus } from '@/Redux/Store/StoreDetail.slice';

export const updateSubscription = async (data, storeId, token, dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}/${storeId}/update/subscription`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(updateSubscriptionStatus(response?.data?.data));
    toast.success(response.data.message || 'Subscription upgrade successfully!');
    return response.data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};
