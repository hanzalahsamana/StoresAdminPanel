"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: {},
  storeLoading: true,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setStoreBranding:(state, action)=>{
      if(state.store){
        state.store.branding = action.payload;
      }
    },
    setStoreLoading: (state, action) => {
      state.storeLoading = action.payload;
    },
  },
});

export const { setStore, setStoreLoading , setStoreBranding } = storeSlice.actions;
const storeReducer = storeSlice.reducer;
export default storeReducer;
