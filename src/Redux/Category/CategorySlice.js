"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
  categoryLoading: true,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setcategory: (state, action) => {
      state.categories = action.payload;
      return state;
    },
    addcategory: (state, action) => {
      state.categories.push(action.payload);
      return state;
    },
    updatecategory: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...action.payload };
      }
      return state;
    },

    deletecategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
      return state;
    },
    setCategoryLoading: (state, action) => {
      state.categoryLoading = action.payload;
      return state;
    },
  },
});

export const {
  setcategory,
  addcategory,
  updatecategory,
  deletecategory,
  setCategoryLoading,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
