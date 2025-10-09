'use client';

import axios from 'axios';
import Base_URL from '../../../config';
// import { setStore } from "@/Redux/AllStores/StoreDetail.slice";
import { toast } from 'react-toastify';
import { dispatch } from '@/Redux/Store';
import { removeDiscount, setStoreConfigurationDiscounts } from '@/Redux/StoreConfiguration/StoreConfigurationSlice';

// ADD DISCOUNT
export const addDiscount = async (discount, token, storeId) => {
  try {
    const response = await axios.post(`${Base_URL}/${storeId}/addDiscount`, discount, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setStoreConfigurationDiscounts(response.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// EDIT DISCOUNT
export const editDiscount = async (discountId, updatedDiscount, token, storeId) => {
  try {
    const response = await axios.patch(`${Base_URL}/${storeId}/editDiscount?discountId=${discountId}`, updatedDiscount, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setStoreConfigurationDiscounts(response.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE DISCOUNT
export const deleteDiscount = async (discountId, token, storeId) => {
  try {
    const response = await axios.delete(`${Base_URL}/${storeId}/deleteDiscount?discountId=${discountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeDiscount(discountId));
    toast.success('Discount deleted successfully!');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'error deleting discount');
  }
};

export const applyCoupon = async (storeId, data) => {
  try {
    const response = await axios.post(`${Base_URL}/${storeId}/applyCoupon`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
