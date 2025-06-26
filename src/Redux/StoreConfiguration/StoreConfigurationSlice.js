"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeConfiguration: {},
  storeConfigurationLoading: true,
};

export const storeConfigurationSlice = createSlice({
  name: "storeConfiguration",
  initialState,
  reducers: {
    setStoreConfiguration: (state, action) => {
      state.storeConfiguration = action.payload;
    },
    setStoreConfigurationPayment:(state , action)=>{
        state.storeConfiguration.paymentMethods = action.payload;
    },
    setStoreConfigurationDiscounts:(state , action)=>{
        state.storeConfiguration.discounts = action.payload;
    },
    setStoreConfigurationLoading: (state, action) => {
      state.storeConfigurationLoading = action.payload;
    },
  },
});

export const { setStoreConfiguration, setStoreConfigurationLoading , setStoreConfigurationPayment } =
  storeConfigurationSlice.actions;
const storeConfgurationReducer = storeConfigurationSlice.reducer;
export default storeConfgurationReducer;
