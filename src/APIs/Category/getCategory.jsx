"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { setcategory, setCategoryLoading } from "@/Redux/Category/CategorySlice";

export const fetchCategory = async (dispatch, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/getCategory`);
    dispatch(setcategory(response.data));
    dispatch(setCategoryLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setCategoryLoading(false));
    toast.error(error.message);
  }
};
