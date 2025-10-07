'use client';

import axios from 'axios';
import Base_URL from '../../../config';
import { toast } from 'react-toastify';
export const addAnnouncement = async (announcement, token, storeId, announcementName) => {
  try {
    const response = await axios.post(`${Base_URL}/${storeId}/addAnnouncement?announcementName=${announcementName}`, announcement, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(response?.data?.message || 'Announcement saved successfully!');
    // dispatch(setStore({ announcements: response.data?.data }));
    return response.data;
  } catch (error) {
    console.error(error?.message || err?.response?.data?.message || 'Something wnet wrong!');
    toast.error(error?.message || err?.response?.data?.message || 'Something wnet wrong!');
  }
};

// DELETE ANNOUNCEMENT
export const deleteAnnouncement = async (announcementId, token, dispatch) => {
  try {
    const response = await axios.delete(`${Base_URL}/deleteAnnouncement?announcementId=${announcementId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(setStore({ announcements: response.data?.data }));
    return response.data;
  } catch (error) {
    throw error;
  }
};
