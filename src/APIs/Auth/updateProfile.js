'use client';

import axios from 'axios';
import Base_URL from '../../../config';

export const updateProfile = async (token, payload) => {
  try {
    const response = await axios.post(`${Base_URL}/updateProfile`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
