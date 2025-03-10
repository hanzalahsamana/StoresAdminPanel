"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import {
  setSectionsData,
  setSectionsDataLoading,
} from "@/Redux/SectionsData/SectionsDataSlice";

export const fetchSectionsData = async (dispatch, type) => {
  try {

    console.log("pagesDatawow" , dispatch , type);
    
    const response = await axios.get(`${BASE_URL}/${type}/getSections`);
    console.log("pagesDatawow", response);
    
    dispatch(setSectionsData(response.data));
    dispatch(setSectionsDataLoading(false));
    
    return response.data;
  } catch (error) {
    console.log("pagesDatawow", error);
    dispatch(setSectionsDataLoading(false));
    toast.error(error.message);
  }
};
