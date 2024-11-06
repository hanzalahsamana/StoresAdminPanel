"use client";

import axios from "axios";
import Base_URL from "../../../config";
import { toast } from "react-toastify";
import { addProductData } from "@/Redux/Product/ProductSlice";

export const addProducts = async (data, type, dispatch) => {
  try {
    const apiUrl = `${Base_URL}/${type}/addProduct`;
    const response = await axios.post(apiUrl, data, {});
    toast.success("product added successfully");
    dispatch(addProductData(response.data));
    return response.data;
  } catch (error) {
    toast.error(
      "Product added failed" || error.response
        ? error.response.data.message
        : error.message
    );
    throw "Product added failed" || error.response
      ? error.response.data.message
      : error.message;
  }
};
