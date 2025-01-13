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
    const response = await axios.patch( `${BASE_URL}/${type}/editPage?id=${pageId}` , data);
    dispatch(updatePagesData(response.data));
    dispatch(setPagesDataLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setPagesDataLoading(false));
    throw new Error(error?.responce?.data?.message);
  }
};
