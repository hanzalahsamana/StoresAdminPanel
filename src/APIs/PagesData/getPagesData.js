"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { setPagesData, setPagesDataLoading } from "@/Redux/PagesData/PagesDataSlice";

export const fetchPagesData = async (dispatch, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/getPages`);
    console.log("ok.ru" , response);
    
    dispatch(setPagesData(response.data));
    dispatch(setPagesDataLoading(false));

    return response.data;
  } catch (error) {
    dispatch(setPagesDataLoading(false));
    toast.error(error.message);
  }
};
