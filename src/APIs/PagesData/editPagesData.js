"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import {
  setPagesDataLoading,
  updatePagesData,
} from "@/Redux/PagesData/PagesDataSlice";

export const editPagesData = async (data, type, pageId, dispatch) => {
  try {
    dispatch(setPagesDataLoading(true));
    const response = await axios.put(
      `${BASE_URL}/${type}/editPage?id=${pageId}`,
      data,
      {}
    );
    toast.success("page updated successfully!");
    dispatch(updatePagesData(response.data));
    dispatch(setPagesDataLoading(false));
    return response.data;
  } catch (error) {
    toast.error(error.message);
    dispatch(setPagesDataLoading(false));
  }
};
