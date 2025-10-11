'use client';
import axios from 'axios';
import BASE_URL from '../../../config';

export const createCheckoutSession = async (storeId, payload) => {
  console.log(payload);
  
  try {
    const { data } = await axios.post(`${BASE_URL}/${storeId}/startCheckout`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyCheckoutSession = async (storeId, checkoutToken) => {
  if (!checkoutToken) return;
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/verifyCheckoutSession/${checkoutToken}`);
    return data;
  } catch (error) {
    throw error;
  }
};
