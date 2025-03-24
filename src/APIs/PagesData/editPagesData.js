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
    const response = await axios.patch( `${BASE_URL}/${type}/editPage?id=${pageId}` , data);
    dispatch(updatePagesData(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error?.responce?.data?.message);
  }
};
