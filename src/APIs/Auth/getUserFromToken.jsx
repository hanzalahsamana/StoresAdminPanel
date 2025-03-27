"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { setCurrentUser, setLoading, setLogout } from "@/Redux/Authentication/AuthSlice";

export const getUserFromToken = async (dispatch, token) => {
    
    if (!token) {
        dispatch(setLogout());
        return;
    }
    
    try { 
        dispatch(setLoading(true));
        
        const response = await axios.get(`${BASE_URL}/getUserFromToken`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        dispatch(setCurrentUser({token , ...response?.data?.user}));

        return response.data;
    } catch (error) {
        if (!error.response) {
            console.error("Network error: Server down or no internet.");
            window.history.replaceState(null, "", "/not-found");
        } else {
            console.error("Error fetching user:", error);
        }
        dispatch(setLogout());
    } finally {
        dispatch(setLoading(false));
    }
};
