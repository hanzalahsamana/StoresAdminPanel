"use client";

import {
  addCartDataApi,
  deleteCartDataApi,
  setCartDataApi,
} from "@/APIs/Cart/CartRefrenceApis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  loading: false,
  initialLoading: true,
  error: null,
};

export const setCartData = createAsyncThunk(
  "cartData/setCartData",
  async ({ cartId, storeId }, { rejectWithValue }) => {
    if (cartId && cartId !== "undefined" && cartId !== "null") {
      try {
        const response = await setCartDataApi(cartId, storeId);
        return response.products;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
    return [];
  }
);

export const addCartData = createAsyncThunk(
  "cartData/addCartData",
  async ({ addedProduct, storeId }, { rejectWithValue }) => {
    try {
      const cartId = localStorage.getItem(`${storeId}_cartId`);
      const response = await addCartDataApi(storeId, cartId, addedProduct);
      return response.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCartData = createAsyncThunk(
  "cartData/deleteCartData",
  async ({ cartProductId, storeId }, { rejectWithValue }) => {
    try {
      const cartID = localStorage.getItem(`${storeId}_cartId`);
      const updatedState = await deleteCartDataApi(
        cartID,
        cartProductId,
        storeId
      );
      return updatedState?.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cartDataSlice = createSlice({
  name: "cartData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setCartData.pending, (state) => {
        state.initialLoading = true;
        state.error = null;
      })
      .addCase(setCartData.fulfilled, (state, action) => {
        state.cartData = action.payload;
        state.initialLoading = false;
      })
      .addCase(setCartData.rejected, (state, action) => {
        state.initialLoading = false;
        state.error = action.payload;
      })
      .addCase(addCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartData.fulfilled, (state, action) => {
        state.cartData = action.payload;
        state.loading = false;
      })
      .addCase(addCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartData.fulfilled, (state, action) => {
        state.cartData = action.payload;
        state.loading = false;
      })
      .addCase(deleteCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartData } = cartDataSlice.actions;
export default cartDataSlice.reducer;
