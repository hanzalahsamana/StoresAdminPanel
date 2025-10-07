'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeConfiguration: {},
  storeConfigurationLoading: true,
};

export const storeConfigurationSlice = createSlice({
  name: 'storeConfiguration',
  initialState,
  reducers: {
    setStoreConfiguration: (state, action) => {
      state.storeConfiguration = action.payload;
    },
    setStoreConfigurationPayment: (state, action) => {
      state.storeConfiguration.paymentMethods = action.payload;
    },
    setStoreConfigurationDiscounts: (state, action) => {
      state.storeConfiguration.discounts = action.payload;
    },
    removeDiscount: (state, action) => {
      console.log('action.payload', action.payload);
      state.storeConfiguration.discounts = state.storeConfiguration.discounts.filter((discount) => discount._id !== action.payload);
    },
    setStoreConfigurationLoading: (state, action) => {
      state.storeConfigurationLoading = action.payload;
    },
  },
});

export const { setStoreConfiguration, setStoreConfigurationLoading, setStoreConfigurationPayment, setStoreConfigurationDiscounts, removeDiscount } =
  storeConfigurationSlice.actions;
const storeConfgurationReducer = storeConfigurationSlice.reducer;
export default storeConfgurationReducer;
