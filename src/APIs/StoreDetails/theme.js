"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { setStoreDetail } from "@/Redux/AllStores/StoreDetail.slice";

export const setTheme = async (theme, token, dispatch) => {
  try {
    console.log(theme, "Sending to backend");

    const { data } = await axios.post(
      `${BASE_URL}/setTheme`,
      { theme },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data?.data);

    dispatch(setStoreDetail(data?.data));
    return data?.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating theme.";
    throw new Error(message);
  }
};
