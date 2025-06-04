"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import {
  setSectionsData,
  setSectionsDataLoading,
} from "@/Redux/SectionsData/SectionsDataSlice";
import { dispatch } from "@/Redux/Store";

export const getSections = async (storeId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${storeId}/getSections`);
    dispatch(setSectionsData(data?.data));
    return data?.data;
  } catch (error) {
   const msg =
      error?.response?.data?.message || error?.message || "something went wrong";
    toast.error(msg);
  } finally {
    dispatch(setSectionsDataLoading(false));
  }
};
