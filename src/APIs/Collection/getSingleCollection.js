'use client';
import axios from 'axios';
import BASE_URL from '../../../config';

export const getSingleCollection = async (storeId, filter = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getSingleCollection?collectionSlug=${filter?.collectionSlug}`);
    return data?.data;
  } catch (error) {
    console.error(error.response ? error.response.data.message : error.message);
  } finally {
  }
};
