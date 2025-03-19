import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maximized: true,
  alwaysExtend: false,
};

const livePreviewSlice = createSlice({
  name: "livePreview",
  initialState,
  reducers: {
    setMaximized: (state, action) => {
      state.maximized = action.payload;
    },
    setAlwaysExtend: (state, action) => {
      state.alwaysExtend = action.payload;
    },
  },
});

export const { setMaximized, setAlwaysExtend } = livePreviewSlice.actions;
export const livePreviewReducer = livePreviewSlice.reducer;
