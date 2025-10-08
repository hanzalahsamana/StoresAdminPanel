'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allStores: [],
  allStoresLoading: true,
};

export const allStoresSlice = createSlice({
  name: 'allStores',
  initialState,
  reducers: {
    setAllStores: (state, action) => {
      state.allStores = action.payload;
    },
    setAllStoresLoading: (state, action) => {
      state.allStoresLoading = action.payload;
    },
    setGenratedStore: (state, action) => {
      state.allStores.push(action.payload);
    },
    deleteStoreFromRedux: (state, action) => {
      state.allStores = state.allStores.filter((store) => store._id !== action.payload);
    },
  },
});

export const { setAllStores, setAllStoresLoading, setGenratedStore, deleteStoreFromRedux } = allStoresSlice.actions;
const allStoresReducer = allStoresSlice.reducer;
export default allStoresReducer;
