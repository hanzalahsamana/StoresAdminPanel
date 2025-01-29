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
        state.pagesData[index] = action.payload;
      }
      return state;
    },
    setPagesDataLoading: (state, action) => {
      state.pagesDataLoading = action.payload;
      return state;
    },
  },
});

export const selectPageByType = (state, pageType) =>{
  return state.pagesData?.pagesData?.find((page) => page.type === pageType);
}

export const {
  setPagesData,
  updatePagesData ,
  setPagesDataLoading,
} = pagesDataSlice.actions;

const pagesDataReducer = pagesDataSlice.reducer;
export default pagesDataReducer ;
