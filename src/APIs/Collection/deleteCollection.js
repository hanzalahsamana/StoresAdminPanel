'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';
import { dispatch } from '@/Redux/Store';
import { deleteCollection, setCollectionLoading } from '@/Redux/Collection/CollectionSlice';

export const deleteCollectionApi = async (token, storeId, collectionId) => {
  try {
    dispatch(setCollectionLoading(true));
    const response = await axios.delete(`${BASE_URL}/${storeId}/deleteCollection?collectionId=${collectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(deleteCollection(collectionId));
    toast.success(response.data.message);
    return response.data.message;
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message);
  } finally {
    dispatch(setCollectionLoading(false));
  }
};
