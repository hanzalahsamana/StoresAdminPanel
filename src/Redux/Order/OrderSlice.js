"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  loading: true,
};

export const orderDataSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orders = action.payload;
      return state;
    },
    orderLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const { setOrderData, orderLoading } = orderDataSlice.actions;

export default orderDataSlice.reducer;
