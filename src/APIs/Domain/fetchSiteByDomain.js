'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { setSiteName, setSiteNameLoading } from '@/Redux/SiteName/SiteNameSlice';

export const fetchSiteByDomain = async (dispatch, domain) => {
  try {
    dispatch(setSiteNameLoading(true));
    const response = await axios.get(`${BASE_URL}/fetchSiteByDomain?domain=${domain}`);
    dispatch(setSiteName(response?.data?.siteName));
    dispatch(setSiteNameLoading(false));
    return response.data;
  } catch (error) {
    console.error(error, 'hello world');
    dispatch(setSiteNameLoading(false));
    toast.error(error.message);
  }
};
