"use client";

import axios from "axios";
import Base_URL from "../../config";

export const addProducts = async (data, type) => {
  try {
    const apiUrl = `${Base_URL}/${type}/addProduct`;

    const response = await axios.post(apiUrl, data, {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response ? error.response.data.message : error.message);
    alert(
      "Product added failed" || error.response
        ? error.response.data.message
        : error.message
    );
  }
};

export const addUser = async (data) => {
  try {
    const apiUrl = `${Base_URL}/register`;
    const response = await axios.post(apiUrl, data, {});
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
};

export const loginUser = async (data) => {
  try {
    const apiUrl = `${Base_URL}/login`;
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
    // return error.response ? error.response.data.message : error.message;
  }
};
