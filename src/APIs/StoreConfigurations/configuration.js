"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { dispatch } from "@/Redux/Store";
import {
  setStoreConfiguration,
  setStoreConfigurationLoading,
} from "@/Redux/StoreConfiguration/StoreConfigurationSlice";

export const getPublicStoreConfiguration = async (storeId) => {
  dispatch(setStoreConfigurationLoading(true));

  try {
    const { data } = await axios.get(
      `${BASE_URL}/${storeId}/getPublicConfiguration`
    );
    dispatch(setStoreConfiguration(data?.data));
    return data?.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "something went wrong.";
    console.error(msg);
  } finally {
    dispatch(setStoreConfigurationLoading(false));
  }
};
export const getAdminStoreConfiguration = async (token, storeId) => {
  dispatch(setStoreConfigurationLoading(true));

  try {
    const { data } = await axios.get(
      `${BASE_URL}/${storeId}/getAdminConfiguration`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(setStoreConfiguration(data?.data));
    return data?.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "something went wrong.";
    console.error(msg);
  } finally {
    dispatch(setStoreConfigurationLoading(false));
  }
};
