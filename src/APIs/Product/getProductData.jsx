"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { setProductData, setProductLoading } from "@/Redux/Product/ProductSlice";

export const fetchProducts = async (dispatch, type) => {
  try {
    console.log("q,,,");
    const response = await axios.get(`${BASE_URL}/${type}/getProducts`);
    dispatch(setProductData(response.data));
    console.log("a,,,");
    dispatch(setProductLoading(false));
    return response.data;
  } catch (error) {
    console.log("b,,,");
    dispatch(setProductLoading(false));
    toast.error(
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong while updating theme."
    );
  }
};
