'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { setCollection, setCollectionLoading } from '@/Redux/Collection/CollectionSlice';
import { dispatch } from '@/Redux/Store';

export const getCollections = async (storeId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getCollections`);
    dispatch(setCollection(data?.data));
    return data?.data;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  } finally {
    dispatch(setCollectionLoading(false));
  }
};
