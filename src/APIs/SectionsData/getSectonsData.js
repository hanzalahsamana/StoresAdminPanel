"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import {
  setSectionsData,
  setSectionsDataLoading,
} from "@/Redux/SectionsData/SectionsDataSlice";

export const fetchSectionsData = async (dispatch, type) => {
  try {

    const response = await axios.get(`${BASE_URL}/${type}/getSections`);
    dispatch(setSectionsData(response.data));
    dispatch(setSectionsDataLoading(false));
    
    return response.data;
  } catch (error) {
    dispatch(setSectionsDataLoading(false));
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while updating theme."
    );
  }
};
