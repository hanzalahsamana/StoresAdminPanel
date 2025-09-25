'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { dispatch } from '@/Redux/Store';
import { setStoreBranding } from '@/Redux/Store/StoreDetail.slice';

export const editStoreAppearance = async (token, storeId, branding) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/${storeId}/editStoreAppearance`,
      { branding },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch(setStoreBranding(data?.branding || null));
    return data?.branding;
  } catch (error) {
    throw error
  }
};
