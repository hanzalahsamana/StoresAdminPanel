'use client';

import axios from 'axios';
import Base_URL from '../../../config';

export const changePassword = async (token, payload) => {
  try {
    const response = await axios.put(`${Base_URL}/edit/password`, payload, {
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
