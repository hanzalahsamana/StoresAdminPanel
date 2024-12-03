"use client";
import axios from "axios";
import BASE_URL from "../../../config";
import { toast } from "react-toastify";
import { setorderStatus } from "@/Redux/Order/OrderSlice";

export const editOrderStatus = async (dispatch, orderId, status , type) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/${type}/editOrder?id=${orderId}`,
            {status}
        );
        toast.success("Order Status updated successfully!");
        dispatch(setorderStatus({orderId , status}));
        return response.data;
    } catch (error) {
        toast.error(error.message);
    }
};
