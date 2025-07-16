'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gallery: [],
  galleryLoading: false,
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    addGalleryImage: (state, action) => {
      state.gallery?.unshift(action.payload);
    },
    deleteGalleryImages: (state, action) => {
      const idsToDelete = action.payload;
      state.gallery = state.gallery?.filter((item) => !idsToDelete.includes(item._id));
    },
    setGalleryLoading: (state, action) => {
      state.galleryLoading = action.payload;
    },
  },
});

export const { setGallery, addGalleryImage, deleteGalleryImages, setGalleryLoading } = gallerySlice.actions;

export const galleryReducer = gallerySlice.reducer;
