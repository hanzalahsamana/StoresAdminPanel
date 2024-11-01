"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
orders:null,
loading:false,
};

export const orderDataSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orders = action.payload;
      return state;
    },
    setLoading: (state) => {
       state.loading = !state.loading;
      return state;
    }
  },
});

export const { setOrderData,setLoading } = orderDataSlice.actions;

export default orderDataSlice.reducer;
