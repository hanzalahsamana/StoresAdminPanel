'use client';
import axios from 'axios';
import BASE_URL from '../../../config';
import { toast } from 'react-toastify';

export const updateSubscription = async (data, storeId, token) => {
    try {
        const response = await axios.put(`${BASE_URL}/${storeId}/update/subscription`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        toast.success(response.data.message || "Subscription upgrade successfully!")
        return response.data;
    } catch (error) {
        toast.error(error.response ? error.response.data.message : error.message)
    }
};