import axios from 'axios';
import BASE_URL from '../../../config';

export const getMenuLinks = async (token, storeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${storeId}/search/getMenuLinks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
