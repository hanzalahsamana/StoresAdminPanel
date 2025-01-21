"use client";

import axios from "axios";
import Base_URL from "../../../config";

export const loginUser = async (data) => {
  try {
    const apiUrl = `${Base_URL}/login`;
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
