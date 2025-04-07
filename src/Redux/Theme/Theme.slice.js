"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: null,
  themeloading: false,
};

export const themeDataSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeData: (state, action) => {
      state.theme = action.payload;
    },
    setThemeLoading: (state, action) => {
      state.themeloading = action.payload;
    },
  },
});

export const { setThemeData, setThemeLoading } = themeDataSlice.actions;
const themeDataReducer = themeDataSlice.reducer
export default themeDataReducer;
