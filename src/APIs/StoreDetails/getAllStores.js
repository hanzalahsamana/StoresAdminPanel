"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { dispatch } from "@/Redux/Store";
import {
  setAllStores,
  setAllStoresLoading,
} from "@/Redux/AllStores/StoreDetail.slice";

export const getAllStores = async (token) => {
  dispatch(setAllStoresLoading(true));
  try {
    const { data } = await axios.get(`${BASE_URL}/getAllStores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setAllStores(data?.data));
    return data.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "something went wrong";
    toast.error(msg);
  } finally {
    dispatch(setAllStoresLoading(false));
  }
};
