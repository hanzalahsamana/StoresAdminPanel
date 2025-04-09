"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { orderLoading, setOrderData } from "@/Redux/Order/OrderSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const fetchOrderData = async (dispatch, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/getOrders`);
    dispatch(setOrderData(response.data));
    dispatch(orderLoading(false));
    return response.data;
  } catch (error) {
    dispatch(orderLoading(false));
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while updating theme."
    );
  }
};
