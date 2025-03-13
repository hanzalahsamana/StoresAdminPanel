"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionsData: [],
  sectionsDataLoading: true,
  editSectionLoading: false,
};

export const SectionsDataSlice = createSlice({
  name: "sectionsData",
  initialState,
  reducers: {
    setSectionsData: (state, action) => {
      state.sectionsData = action.payload ?? [];
    },

    updateSectionsData: (state, action) => {
      const index = state.sectionsData.findIndex(
        (section) => section._id === action.payload._id
      );
      if (index !== -1) {
        state.sectionsData[index] = action.payload;
      }
    },

    setSectionsDataLoading: (state, action) => {
      state.sectionsDataLoading = action.payload;
    },
    setEditSectionLoading: (state, action) => {
      state.editSectionLoading = action.payload;
    },
  },
});

export const selectSectionByType = (state, sectionType) =>
  state.sectionsData?.sectionsData?.find(
    (section) => section.type === sectionType
  ) || null;

export const selectSectionByID = (state, sectionId) => {
  return (
    state.sectionsData?.sectionsData?.find(
      (section) => section._id === sectionId
    ) || null
  );
};

export const { setSectionsData, updateSectionsData, setSectionsDataLoading , setEditSectionLoading } =
  SectionsDataSlice.actions;

export const sectionsDataReducer = SectionsDataSlice.reducer;
