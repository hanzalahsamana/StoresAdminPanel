import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maximized: true,
  alwaysExtend: false,
  isSidebarOpen: true,
  selectedDevicePreview: 'laptop',
};

const livePreviewSlice = createSlice({
  name: 'livePreview',
  initialState,
  reducers: {
    setMaximized: (state, action) => {
      state.maximized = action.payload;
    },
    setAlwaysExtend: (state, action) => {
      state.alwaysExtend = action.payload;
    },
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setSelectedDevicePreview: (state, action) => {
      state.selectedDevicePreview = action.payload;
    },
  },
});

export const { setMaximized, setAlwaysExtend, setIsSidebarOpen, setSelectedDevicePreview } = livePreviewSlice.actions;
export const livePreviewReducer = livePreviewSlice.reducer;
