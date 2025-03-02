"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { setCurrentUser, setLoading } from "@/Redux/Authentication/AuthSlice";

export const getUserFromToken = async (dispatch, type) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${BASE_URL}/${type}/getUserFromToken`);
        console.log(response, "hello world");
        dispatch(setCurrentUser(response?.data?.user));
        dispatch(setLoading(false));
        return response.data;
    } catch (error) {
        console.error(error, "hello world");
        dispatch(setLoading(false));
        toast.error(error.message);
    }
};
