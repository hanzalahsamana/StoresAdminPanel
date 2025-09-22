'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { setanalyticData, setAnalyticLoading } from '@/Redux/Analytics/analytic.slice';
import { dispatch } from '@/Redux/Store';

export const FetchAnalytics = async (token, storeId, dateFilter) => {
  try {
    dispatch(setAnalyticLoading(true));
    const response = await axios.get(`${BASE_URL}/${storeId}/getAnalytics?dateFilter=${dateFilter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setanalyticData(response.data));
    dispatch(setAnalyticLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setAnalyticLoading(false));
    toast.error(error.message);
  }
};
