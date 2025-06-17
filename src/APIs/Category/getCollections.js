"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { setcategory, setCategoryLoading } from "@/Redux/Category/CategorySlice";
import { dispatch } from "@/Redux/Store";

export const getCollections = async (storeId) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/${storeId}/getCollections`);
    console.log(data , "''''");
    
    dispatch(setcategory(data?.data));
    return data?.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message || error?.message || "something went wrong";
    toast.error(msg);
  } finally {
    dispatch(setCategoryLoading(false));
  }
};
