"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeDetail: {},
  storeDetailLoading: true,
};

export const storeDetailSlice = createSlice({
  name: "storeDetail",
  initialState,
  reducers: {
    setStoreDetail: (state, action) => {
      state.storeDetail = action.payload;
    },
    setStoreDetailLoading: (state, action) => {
      state.storeDetailLoading = action.payload;
    },
  },
});

export const { setStoreDetail, setStoreDetailLoading } =
  storeDetailSlice.actions;
const storeDetailReducer = storeDetailSlice.reducer;
export default storeDetailReducer;
