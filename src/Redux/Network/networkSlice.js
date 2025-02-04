import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setOnline: (state) => {
      state.isOnline = true;
    },
    setOffline: (state) => {
      state.isOnline = false;
    },
  },
});

export const { setOnline, setOffline } = networkSlice.actions;
export const networkReducer = networkSlice.reducer;
