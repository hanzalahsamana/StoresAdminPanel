"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagesData: [],
  pagesDataLoading: true,
};

export const pagesDataSlice = createSlice({
  name: "pagesData",
  initialState,
  reducers: {
    setPagesData: (state, action) => {
      state.pagesData = action.payload ?? [];
    },

    updatePagesData: (state, action) => {
      const index = state.pagesData.findIndex(
        (page) => page._id === action.payload._id
      );
      if (index !== -1) {
        state.pagesData[index] = action.payload;
      }
    },

    setPagesDataLoading: (state, action) => {
      state.pagesDataLoading = action.payload;
    },
  },
});

export const selectPageByType = (state, pageType) =>
  state.pagesData?.pagesData?.find((page) => page.type === pageType) || null;

export const selectPageByID = (state, pageId) => {
  
  return state.pagesData?.pagesData?.find((page) => page._id === pageId) || null;
};

export const { setPagesData, updatePagesData, setPagesDataLoading } =
  pagesDataSlice.actions;

export default pagesDataSlice.reducer;
