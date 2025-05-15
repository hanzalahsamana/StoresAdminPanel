"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import {
  setStoreDetail,
  setStoreDetailLoading,
} from "@/Redux/StoreDetail/StoreDetail.slice";
import { toast } from "react-toastify";

export const fetchStoreDetails = async (dispatch, siteName) => {
  try {
    dispatch(setStoreDetailLoading(true));
    const { data } = await axios.get(`${BASE_URL}/${siteName}/getStoreDetails`);

    dispatch(setStoreDetail(data?.data));
    dispatch(setStoreDetailLoading(false));
    return data.data;
  } catch (error) {
    dispatch(setStoreDetailLoading(false));
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while updating theme."
    );
  }
};
