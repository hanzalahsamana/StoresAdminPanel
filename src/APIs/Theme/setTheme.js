"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { setThemeData, setThemeLoading } from "@/Redux/Theme/Theme.slice";

export const setTheme = async (data, token, dispatch) => {
  try {
    dispatch(setThemeLoading(true));
    console.log(data, "Sending to backend");

    const response = await axios.post(`${BASE_URL}/setTheme`, {theme:data}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    dispatch(setThemeData(response.data));
    dispatch(setThemeLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setThemeLoading(false));
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating theme.";
    throw new Error(message);
  }
};
