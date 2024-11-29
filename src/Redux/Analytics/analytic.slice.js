"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analytics: null,
  analyticloading: true,
};

export const analyticDataSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setanalyticData: (state, action) => {
      state.analytics = action.payload;
    },
    setAnalyticLoading: (state, action) => {
      state.analyticloading = action.payload;
    },
  },
});

export const { setanalyticData, setAnalyticLoading } = analyticDataSlice.actions;
const analyticDataReducer = analyticDataSlice.reducer
export default analyticDataReducer;
