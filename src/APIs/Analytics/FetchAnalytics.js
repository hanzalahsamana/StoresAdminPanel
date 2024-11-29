"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { setanalyticData, setAnalyticLoading } from "@/Redux/Analytics/analytic.slice";

export const FetchAnalytics = async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/HannanFabrics/getAnalytics`);
    dispatch(setanalyticData(response.data));
    dispatch(setAnalyticLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setAnalyticLoading(false));
    toast.error(error.message);
  }d
};
