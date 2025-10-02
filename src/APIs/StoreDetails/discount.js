'use client';

import axios from 'axios';
import Base_URL from '../../../config';
// import { setStore } from "@/Redux/AllStores/StoreDetail.slice";
import { toast } from 'react-toastify';

// ADD DISCOUNT
export const addDiscount = async (discount, token, dispatch) => {
  try {
    const response = await axios.post(
      `${Base_URL}/addDiscount`,
      { discount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // dispatch(setStore(response.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// EDIT DISCOUNT
export const editDiscount = async (discountId, updatedDiscount, token, dispatch) => {
  try {
    const response = await axios.patch(
      `${Base_URL}/editDiscount`,
      { discountId, updatedDiscount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // dispatch(setStore(response.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE DISCOUNT
export const deleteDiscount = async (discountId, token, dispatch) => {
  try {
    const response = await axios.delete(`${Base_URL}/deleteDiscount?discountId=${discountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(setStore(response.data?.data));
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
