"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagesData: null,
  pagesDataLoading: true,
};

export const pagesDataSlice = createSlice({
  name: "pagesData",
  initialState,
  reducers: {
    setPagesData: (state, action) => {
      state.pagesData = action.payload;
      return state;
    },

    updatePagesData: (state, action) => {
      const index = state.pagesData.findIndex(
        (page) => page._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
      return state;
    },
    setPagesDataLoading: (state, action) => {
      state.productLoading = action.payload;
      return state;
    },
  },
});

export const {
  setProductData,
  addProductData,
  updateProductData,
  deleteProductData,
  setProductLoading,
} = productDataSlice.actions;

export default productDataSlice.reducer;
