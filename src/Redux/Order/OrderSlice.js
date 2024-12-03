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
    setorderStatus: (state, action) => {
      const updatedArray = state.orders.map((item) =>
        item._id === action.payload.orderId
          ? {
              ...item,
              orderInfo: { ...item.orderInfo, status: action.payload.status },
            }
          : item
      );
      state.orders = updatedArray;
    },
    orderLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const { setOrderData, orderLoading , setorderStatus } = orderDataSlice.actions;

export default orderDataSlice.reducer;
