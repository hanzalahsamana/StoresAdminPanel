"use client";

import { addCartDataApi, deleteCartDataApi, setCartDataApi } from "@/APIs/Cart/CartRefrenceApis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  cartData: [],
  loading: false,
  initialLoading: false,
  error: null,
};

export const setCartData = createAsyncThunk(
  "cartData/setCartData",
  async (cartId, { rejectWithValue }) => {
    if (cartId && cartId !== "undefined" && cartId !== "null") {
      try {
        const response = await setCartDataApi(cartId);
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
  async ({ addedProduct, siteName }, { rejectWithValue }) => {
    try {
      const cartID = localStorage.getItem(`${siteName}_cartId`);
      const response = await addCartDataApi(addedProduct, cartID, siteName);
      return response.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCartData = createAsyncThunk(
  "cartData/deleteCartData",
  async ({ productId, siteName }, { rejectWithValue }) => {
    try {
      const cartID = localStorage.getItem(`${siteName}_cartId`);
      const updatedState = await deleteCartDataApi(cartID, productId);
      return [];
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
