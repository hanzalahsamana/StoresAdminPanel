'use client';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../../config';

export const setCartDataApi = async (cartId, storeId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getCartData?cartId=${cartId}`);
    return data;
  } catch (error) {
    localStorage.removeItem(`${storeId}_cartId`);
  }
};

export const addCartDataApi = async (storeId, cartId, addedProduct) => {
  try {
    let url = `${BASE_URL}/${storeId}/addToCart`;
    if (cartId && cartId !== 'undefined') {
      url += `?cartId=${cartId}`;
    }

    const { data } = await axios.post(url, addedProduct);
    localStorage.setItem(`${data.storeRef}_cartId`, data._id);
    return data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};

export const deleteCartDataApi = async (cartId, cartProductId, storeId) => {
  try {
    let url = `${BASE_URL}/${storeId}/deleteCartData?cartId=${cartId}`;

    if (cartProductId) {
      url += `&&cartProductId=${cartProductId}`;
    }
    const { data } = await axios.delete(url);
    return data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};
