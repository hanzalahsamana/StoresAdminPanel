"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { updatecategory } from "@/Redux/Category/CategorySlice";

export const editCategory = async (data, type, id, dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${type}/editCategory?id=${id}`,
      data,
      {}
    );
    toast.success("Category updated successfully!");
    dispatch(updatecategory(response.data));
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
