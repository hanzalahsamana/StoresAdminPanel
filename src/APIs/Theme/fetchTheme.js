"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { setThemeData, setThemeLoading } from "@/Redux/Theme/Theme.slice";
import { toast } from "react-toastify";

export const fetchTheme = async (dispatch, siteName) => {
  try {
    dispatch(setThemeLoading(true));
    const { data } = await axios.get(`${BASE_URL}/${siteName}/getTheme`);

    dispatch(setThemeData(data?.data));
    dispatch(setThemeLoading(false));
    return data.data;
  } catch (error) {
    dispatch(setThemeLoading(false));
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while updating theme."
    );
  }
};
