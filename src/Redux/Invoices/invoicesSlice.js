'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  invoicePagination: {},
  invoicesLoading: true,
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload.invoices;
      state.invoicePagination = action.payload.pagination;
      state.invoicesLoading = false;
    },
    setInvoiceLoading: (state, action) => {
      state.invoicesLoading = action.payload;
    },
  },
});

export const { setInvoices, setInvoiceLoading } = invoicesSlice.actions;
const invoiceReducer = invoicesSlice.reducer;
export default invoiceReducer;
