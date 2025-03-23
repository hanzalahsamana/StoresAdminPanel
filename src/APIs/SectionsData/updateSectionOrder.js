"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import {
  setEditSectionLoading,
  setSectionsData,
} from "@/Redux/SectionsData/SectionsDataSlice";

export const updateSectionOrder = async (
  newOrder,
  type,
  sectionId,
  dispatch
) => {
  try {
    dispatch(setEditSectionLoading(true));
    console.log(newOrder, "kiloj");

    const { data } = await axios.patch(
      `${BASE_URL}/${type}/editSectionOrder?id=${sectionId}`,
      { newOrder }
    );
    dispatch(setSectionsData(data.sections));
    dispatch(setEditSectionLoading(false));
    return data;
  } catch (error) {
    dispatch(setEditSectionLoading(false));
    throw new Error(
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || "Something went wrong"
    );
  }
};
