"use client";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../../config";

export const setCartDataApi = async (cartId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getCartData?id=${cartId}`);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const addCartDataApi = async (addedProduct , cartId , siteName) => {
  try {
    let url = `${BASE_URL}/addCart`;
    if (cartId && cartId !== 'undefined') {
        url += `?id=${cartId}`;
    }
    const response = await axios.post(url, addedProduct);
    localStorage.setItem(`${siteName}_cartId`, response.data.cartId);
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const deleteCartDataApi = async (cartId, productId) => {
  try {
    let url = `${BASE_URL}/deleteCartProduct?id=${cartId}`;

    if (productId) {
      url += `&&productId=${productId}`;
    }
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
