'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { updateSubscriptionStatus } from '@/Redux/Store/StoreDetail.slice';

export const updateReferralModal = async (storeId, id, dispatch, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${storeId}/referral/${id}/modal-shown`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // dispatch(updateSubscriptionStatus(response.data?.data));
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message || 'Something went wrong.');
  }
};
