'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { toast } from 'react-toastify';
import { setAnnouncements } from '@/Redux/StoreConfiguration/StoreConfigurationSlice';
import { dispatch } from '@/Redux/Store';

export const addAnnouncement = async (announcement, token, storeId, announcementName) => {
  try {
    const response = await axios.post(`${Base_URL}/${storeId}/addAnnouncement?announcementName=${announcementName}`, announcement, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(response?.data?.message || 'Announcement saved successfully!');
    dispatch(setAnnouncements(response?.data?.data));
    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message || 'Something went wrong!');
  }
};
