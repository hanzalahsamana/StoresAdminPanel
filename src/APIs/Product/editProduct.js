"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import {
  setProductLoading,
  updateProductData,
} from "@/Redux/Product/ProductSlice";

export const editProductData = async (data, type, id, dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${type}/editProduct?id=${id}`,
      data,
      {}
    );
    toast.success("Product updated successfully!");
    dispatch(updateProductData(response.data));
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
