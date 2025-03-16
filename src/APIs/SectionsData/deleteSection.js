"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import {
  setEditSectionLoading,
  setSectionsData,
} from "@/Redux/SectionsData/SectionsDataSlice";

export const deleteSectionsData = async (type, sectionId, dispatch) => {
  try {
    dispatch(setEditSectionLoading(true));
    const response = await axios.delete(
      `${BASE_URL}/${type}/deleteSection?id=${sectionId}`
    );
    dispatch(setSectionsData(response?.data));
    dispatch(setEditSectionLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setEditSectionLoading(false));
    throw new Error(error?.responce?.data?.message);
  }
};
