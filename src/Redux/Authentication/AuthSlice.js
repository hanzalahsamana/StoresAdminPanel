"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currUser: null,
  loading: true,
};

export const currentDataSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currUser = action.payload;
      return state;
    },
    setLogout: (state) => {
      state.currUser = null;
      localStorage.removeItem("currentUser");
      state.loading = false;
      return state;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const { setCurrentUser, setLogout, setLoading } =
  currentDataSlice.actions;

export default currentDataSlice.reducer;
