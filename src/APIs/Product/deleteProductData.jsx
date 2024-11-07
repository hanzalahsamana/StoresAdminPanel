"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import {
  deleteProductData,
  setProductData,
  setProductLoading,
} from "@/Redux/Product/ProductSlice";

export const deleteProduct = async (type, id, dispatch) => {
  try {
    dispatch(setProductLoading(true));
    const response = await axios.delete(
      `${BASE_URL}/${type}/deleteProduct?id=${id}`
    );
    dispatch(deleteProductData(id));
    dispatch(setProductLoading(false));
    toast.success(response.data.message);
    return response.data.message;
  } catch (error) {
    dispatch(setProductLoading(false));
    toast.error(error.message);
  }
};
