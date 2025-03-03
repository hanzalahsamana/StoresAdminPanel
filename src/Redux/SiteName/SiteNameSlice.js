"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  siteName: null,
  loading: true,
  error: null,
};

export const siteNameSlice = createSlice({
  name: "siteName",
  initialState,
  reducers: {
    setSiteName: (state, action) => {
      state.siteName = action.payload;
    },
    setSiteNameLoading: (state, action) => {
      state.loading = action.payload;
    },
    // setError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
});

export const { setSiteName , setSiteNameLoading } = siteNameSlice.actions;

export const siteNameReducer = siteNameSlice.reducer;
