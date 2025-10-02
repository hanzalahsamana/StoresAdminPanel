'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setInvoiceLoading, setInvoices } from '@/Redux/Invoices/invoicesSlice';

export const getInvoices = async (token, dispatch, storeId, query) => {
  try {
    dispatch(setInvoiceLoading(true));
    const response = await axios.get(`${BASE_URL}/${storeId}/store/invoices?limit=${query?.limit}&page=${query?.page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(setInvoices(response?.data));
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message || 'Something went wrong.');
  } finally {
    dispatch(setInvoiceLoading(false));
  }
};
