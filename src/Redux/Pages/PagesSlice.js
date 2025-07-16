'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pages: [],
};

export const contentDataSlice = createSlice({
  name: 'contentData',
  initialState,
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload ?? [];
    },
  },
});

export const getPageByName = (state, contentName) => state.contentData?.contentData?.find((content) => content.type === contentName) || null;

export const getContentByID = (state, contentId) => {
  return state.contentData?.contentData?.find((content) => content._id === contentId) || null;
};

export const { setPages: setContentData, updateContentData, setContentDataLoading } = contentDataSlice.actions;

export const contentDataReducer = contentDataSlice.reducer;
