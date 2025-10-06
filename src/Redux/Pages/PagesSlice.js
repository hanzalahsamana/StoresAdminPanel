'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pages: [],
  editingPage: null,
  editingPageMode: '',
  pagesLoading: false,
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload ?? [];
    },
    addPage: (state, action) => {
      state.pages.unshift(action.payload);
    },
    setEditingPage: (state, action) => {
      state.editingPage = action.payload;
    },
    setEditingMode: (state, action) => {
      state.editingPageMode = action.payload;
    },
    setPageLoading: (state, action) => {
      state.pagesLoading = action.payload;
    },
    deletePage: (state, action) => {
      const slugToDelete = action.payload;
      state.pages = state.pages.filter((page) => page.slug !== slugToDelete);
    },
  },
});

export const { setPages, addPage, setEditingPage, setEditingMode, setPageLoading, deletePage } = pagesSlice.actions;

export const pagesReducer = pagesSlice.reducer;

// export const getPageByName = (state, contentName) => state.contentData?.contentData?.find((content) => content.type === contentName) || null;

// export const getContentByID = (state, contentId) => {
//   return state.contentData?.contentData?.find((content) => content._id === contentId) || null;
// };
