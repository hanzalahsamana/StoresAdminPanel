"use client";

import axios from "axios";
import Base_URL from "../../../config";

export const addUser = async (data) => {
    try {
      const apiUrl = `${Base_URL}/register`;
      const response = await axios.post(apiUrl, data, {});
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  };