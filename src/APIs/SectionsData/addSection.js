"use client";

import axios from "axios";
import Base_URL from "../../../config";
import { toast } from "react-toastify";
import { setSectionsData } from "@/Redux/SectionsData/SectionsDataSlice";

export const addSection = async (type , data, dispatch) => {
  try {
    const apiUrl = `${Base_URL}/${type}/addSection`;
    const response = await axios.post(apiUrl, data, {});
    toast.success("Section added successfully");
    dispatch(setSectionsData(response.data));
    return response.data;
  } catch (error) {
    throw "Section adding failed" || error.response
      ? error.response.data.message
      : error.message;
  }
};
