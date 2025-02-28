"use client";

import axios from "axios";
import BASE_URL from "../../../config";


export const addDomainDns = async (domain) => {
    try {
        console.log(BASE_URL, domain, "♀️♀️");

        const response = await axios.post(`${BASE_URL}/${'abc'}/addDomainDns`, { domain });
        console.log(response, "♀️♀️♀️");

        return response.data;
    } catch (error) {
        console.log(error, "♀️♀️♀️♀️");

        throw error
    }
};


export const genrateSSl = async (domain) => {
    try {
        console.log(BASE_URL, domain, "♀️♀️");
        const response = await axios.post(`${BASE_URL}/${'abc'}/genrateSSl`, { domain });
        console.log(response, "♀️♀️♀️");

        return response.data;
    } catch (error) {
        console.log(error, "♀️♀️♀️♀️");

        throw error
    }
};