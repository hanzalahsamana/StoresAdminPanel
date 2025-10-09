import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';

export const addSubscriber = async (storeId, email) => {
  try {
    let url = `${BASE_URL}/${storeId}/addSubscriber`;
    const response = await axios.post(url, { email });
    toast.success(response?.data?.message || 'Subscribed successfully!');
    return response.data;
  } catch (error) {
    console.error('Error adding subscriber', error?.response?.data?.message || error?.message || 'Something went wrong!');
    toast.error(error?.response?.data?.message || error?.message || 'Something went wrong!');
  }
};
