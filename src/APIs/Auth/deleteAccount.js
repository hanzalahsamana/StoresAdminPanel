'use client';

import axios from 'axios';
import Base_URL from '../../../config';

export const deleteAccount = async (token, payload) => {
  console.log(token, payload);

  try {
    const response = await axios.delete(`${Base_URL}/delete/account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
