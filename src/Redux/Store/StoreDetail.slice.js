'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  store: { header: null, footer: null },
  storeLoading: true,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    updateSubscriptionStatus: (state, action) => {
      state.store = { ...state.store, subscriptionId: action.payload };
    },
    setStoreBranding: (state, action) => {
      if (state.store) {
        state.store.branding = action.payload;
      }
    },
    setStoreLoading: (state, action) => {
      state.storeLoading = action.payload;
    },
    // setStoreHeader: (state, action) => {
    //   state.store.header = action.payload;
    // },
    // setStoreFooter: (state, action) => {
    //   state.store.footer = action.payload;
    // },
  },
});

export const { setStore, setStoreLoading, updateSubscriptionStatus, setStoreBranding } = storeSlice.actions;
const storeReducer = storeSlice.reducer;
export default storeReducer;
