"use client";

import axios from "axios";
import BASE_URL from "../../../config";

export const verifyDomain = async (type , domain) => {
    try {
        const response = await axios.get(`${BASE_URL}/${type}/verifyDomain?domain=${domain}`);
        return response.data;
    } catch (error) {
        throw error
    }
};