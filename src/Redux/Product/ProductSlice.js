'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productLoading: false,
};

export const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.products = action.payload;
      return state;
    },
    addProductData: (state, action) => {
      state.products.push(action.payload);
      return state;
    },
    updateProductData: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = { ...action.payload };
      }
      return state;
    },

    deleteProductData: (state, action) => {
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.products = state.products.filter((product) => !idsToDelete.includes(product._id));
      return state;
    },

    setProductLoading: (state, action) => {
      state.productLoading = action.payload;
      return state;
    },
  },
});

export const { setProductData, addProductData, updateProductData, deleteProductData, setProductLoading } = productDataSlice.actions;

export default productDataSlice.reducer;
