'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { dispatch } from '@/Redux/Store';
import { setStoreConfigurationPayment } from '@/Redux/StoreConfiguration/StoreConfigurationSlice';

export const updatePaymentMethod = async (token, storeId, credential) => {
  try {
    const { data } = await axios.patch(`${BASE_URL}/${storeId}/updatePaymentMethod`, credential, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(setStoreConfigurationPayment(data?.data));
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getHashedPaymentCredential = async (storeId, methodId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getHashedPaymentCredential?methodId=${methodId}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};
