"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const currentDataSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state = action.payload;
      console.log(state, ">>>>>><<<<<<<<<");
    },
    setLogout: (state) => {
      state = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { setCurrentUser, setLogout } = currentDataSlice.actions;

export default currentDataSlice.reducer;
