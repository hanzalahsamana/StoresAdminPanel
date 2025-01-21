"use client";

import axios from "axios";
import Base_URL from "../../../config";

export const verifyOtp = async (data) => {
    try {
        const apiUrl = `${Base_URL}/verifyOtp`;
        const response = await axios.post(apiUrl, data, {});
        return response.data;
    } catch (error) {
        throw error;
    }
};