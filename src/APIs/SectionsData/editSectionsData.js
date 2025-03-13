"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { setEditSectionLoading, updateSectionsData } from "@/Redux/SectionsData/SectionsDataSlice";

export const editSectionsData = async (data, type, sectionId, dispatch) => {
  try {
    dispatch(setEditSectionLoading(true));
    console.log(data , "kiloj");
    
    const response = await axios.patch( `${BASE_URL}/${type}/editSection?id=${sectionId}` , data);
    dispatch(updateSectionsData(response.data));
    dispatch(setEditSectionLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setEditSectionLoading(false));
    throw new Error(error?.responce?.data?.message);
  }
};
