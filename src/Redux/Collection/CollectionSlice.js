'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collections: [],
  collectionLoading: true,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.collections = action.payload;
    },
    addCollection: (state, action) => {
      state.collections.push(action.payload);
    },
    updateCollection: (state, action) => {
      const index = state.collections.findIndex((collection) => collection._id === action.payload._id);
      if (index !== -1) {
        state.collections[index] = { ...state.collections[index], ...action.payload };
      }
    },
    deleteCollection: (state, action) => {
      const idsToDelete = action.payload;
      state.collections = state.collections.filter((collection) => !idsToDelete.includes(collection._id));
    },

    setCollectionLoading: (state, action) => {
      state.collectionLoading = action.payload;
    },
  },
});

export const { setCollection, addCollection, updateCollection, deleteCollection, setCollectionLoading } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
