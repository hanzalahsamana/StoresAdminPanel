'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contentData: [],
  contentDataLoading: true,
};

export const contentDataSlice = createSlice({
  name: 'contentData',
  initialState,
  reducers: {
    setContentData: (state, action) => {
      state.contentData = action.payload ?? [];
    },

    updateContentData: (state, action) => {
      const index = state.contentData.findIndex((page) => page._id === action.payload._id);
      if (index !== -1) {
        state.contentData[index] = action.payload;
      }
    },

    setContentDataLoading: (state, action) => {
      state.contentDataLoading = action.payload;
    },
  },
});

export const getContentByName = (state, contentName) => state.contentData?.contentData?.find((content) => content.type === contentName) || null;

export const getContentByID = (state, contentId) => {
  return state.contentData?.contentData?.find((content) => content._id === contentId) || null;
};

export const { setContentData, updateContentData, setContentDataLoading } = contentDataSlice.actions;

export const contentDataReducer = contentDataSlice.reducer;
