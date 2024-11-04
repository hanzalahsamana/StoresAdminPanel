"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  productLoading: true,
};

export const productDataSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.products = action.payload;
      return state;
    },
    setProductLoading: (state, action) => {
      state.productLoading = action.payload;
      return state;
    },
  },
});

export const { setProductData, setProductLoading } = productDataSlice.actions;

export default productDataSlice.reducer;
