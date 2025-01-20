"use client";

import axios from "axios";
import Base_URL from "../../../config";

export const verifyOtp = async (data) => {
    try {
        console.log("verify gaya  ⚱️", data);

        console.log("woooo1"); 
        const apiUrl = `${Base_URL}/verifyOtp`;
        console.log("woooo1"); 
        const response = await axios.post(apiUrl, data, {});
        console.log("verify aaya", response);
        console.log("woooo2 ⚱️"); 
        return response.data;
        console.log("woooo3"); 
    } catch (error) {
        console.log("woooo4 ⚱️" , error); 
        throw error;
    }
};