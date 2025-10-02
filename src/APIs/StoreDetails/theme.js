'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
// import { setStore } from "@/Redux/AllStores/StoreDetail.slice";

export const setTheme = async (theme, token) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/setTheme`,
      { theme },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // dispatch(setStore(data?.data));
    return data?.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Something went wrong while updating theme.';
    throw new Error(message);
  }
};
