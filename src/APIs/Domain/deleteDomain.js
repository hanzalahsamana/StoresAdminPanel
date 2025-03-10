"use client";
import axios from "axios";
import BASE_URL from "../../../config";

export const deleteDomain = async (type) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${type}/deleteDomain`);

    return response.data.message;
  } catch (error) {
    console.error(
      "Error deleting domain:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to delete domain");
  }
};