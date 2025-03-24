"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { setCurrentUser, setLoading } from "@/Redux/Authentication/AuthSlice";

export const getUserFromToken = async (dispatch, type) => {
    if(!type){
         dispatch(setCurrentUser(null));
         console.log("1,,,");
        return dispatch(setLoading(false));
    }
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${BASE_URL}/${type}/getUserFromToken`);
        console.log(response, "hello world");
        dispatch(setCurrentUser(response?.data?.user));
        dispatch(setLoading(false));
        console.log("2,,,");
        return response.data;
    } catch (error) {
        // if (!error.response) {
        //     // Network error (server down, no internet, etc.)
        //     console.log("3,,,");
        //     window.history.replaceState(null, "", "/not-found"); // Rewrite URL without redirect
        // }
        
        console.error(error, "hello world");
        dispatch(setLoading(false));
    }
};
