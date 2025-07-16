import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { dispatch } from '@/Redux/Store';

export const getPage = async (storeId, pageName = 'home') => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/pages/${pageName}`);
    dispatch(setCollection(data?.data));
    return data?.data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  } finally {
    dispatch(setCollectionLoading(false));
  }
};
