"use client";

import axios from "axios";
import Base_URL from "../../../config";
import { toast } from "react-toastify";
import { addcategory } from "@/Redux/Category/CategorySlice";

export const addCategory = async (data, type, dispatch) => {
  try {
    const apiUrl = `${Base_URL}/${type}/addCategory`;
    const response = await axios.post(apiUrl, data, {});
    toast.success("category added successfully");
    dispatch(addcategory(response.data));
    return response.data;
  } catch (error) {
    toast.error(
      "Category added failed" || error.response
        ? error.response.data.message
        : error.message
    );
    throw "Category added failed" || error.response
      ? error.response.data.message
      : error.message;
  }
};
