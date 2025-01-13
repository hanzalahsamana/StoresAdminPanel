"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { deletecategory, setCategoryLoading } from "@/Redux/Category/CategorySlice";

export const deleteCategory = async (type, id, dispatch) => {
  try {
    dispatch(setCategoryLoading(true));
    const response = await axios.delete(
      `${BASE_URL}/${type}/deleteCategory?id=${id}`
    );
    dispatch(deletecategory(id));
    dispatch(setCategoryLoading(false));
    toast.success(response.data.message);
    return response.data.message;
  } catch (error) {
    dispatch(setCategoryLoading(false));
    toast.error(error.message);
  }
};
