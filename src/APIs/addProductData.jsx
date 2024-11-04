"use client";

import axios from "axios";
import Base_URL from "../../config";
import { toast } from "react-toastify";

export const addProducts = async (data, type) => {
  try {
    const apiUrl = `${Base_URL}/${type}/addProduct`;

    const response = await axios.post(apiUrl, data, {});
    toast.success("product added successfully");
    return response.data;
  } catch (error) {
    console.log(error.response ? error.response.data.message : error.message);
    toast.error(
      "Product added failed" || error.response
        ? error.response.data.message
        : error.message
    );
  }
};
