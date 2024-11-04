"use client";
import axios from "axios";
import BASE_URL from "../../config";
import { toast } from "react-toastify";
import { setProductData, setProductLoading } from "@/Redux/Product/ProductSlice";

export const fetchProducts = async (dispatch, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/getProducts`);
    dispatch(setProductData(response.data));
    dispatch(setProductLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setProductLoading(false));
    toast.error(error.message);
  }
};
