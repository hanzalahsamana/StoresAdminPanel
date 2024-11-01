"use client";
import axios from "axios";
import BASE_URL from "../../config";
import { setLoading, setOrderData } from "@/Redux/Order/OrderSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const fetchOrderData = async (dispatch, user) => {
  try {
    dispatch(setLoading());
    const response = await axios.get(`${BASE_URL}/${user.brandName}/getOrders`);
    console.log(response.data)
    dispatch(setOrderData(response.data));
    dispatch(setLoading());
    return response.data;
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
  }
};
