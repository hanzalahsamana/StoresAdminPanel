"use client";

import axios from "axios";
import Base_URL from "../../../config";
import { setStoreDetail } from "@/Redux/StoreDetail/StoreDetail.slice";

// ADD VARIATION
export const addVariation = async (variation, token, dispatch) => {
  try {
    const response = await axios.post(
      `${Base_URL}/addVariation`,
      { variation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("addVariation", response.data);

    dispatch(setStoreDetail(response.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// EDIT VARIATION
export const editVariation = async (
  variationId,
  updatedVariation,
  token,
  dispatch
) => {
  try {
    console.log("editVariation", variationId, updatedVariation, token);
    const response = await axios.patch(
      `${Base_URL}/editVariation`,
      { variationId, updatedVariation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setStoreDetail(response.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE VARIATION
export const deleteVariation = async (variationId, token, dispatch) => {
  try {
    const response = await axios.delete(
      `${Base_URL}/deleteVariation?variationId=${variationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setStoreDetail(response.data?.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
