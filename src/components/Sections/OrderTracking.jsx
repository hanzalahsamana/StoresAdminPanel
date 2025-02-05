import React, { useState } from "react";
import { FaCheckCircle, FaRegHourglass, FaTruck, FaGift } from "react-icons/fa"; // React icons

const OrderTracking = () => {
    const [orderId, setOrderId] = useState("");
    const [orderStatus, setOrderStatus] = useState(null);

    // Sample getStatusFunction that simulates getting the status based on the order ID.
    const getStatusFunction = (id) => {
        // Replace this with your actual function that fetches the order status.
        const status = {
            "1": "confirmed",
            "2": "processing",
            "3": "onWay",
            "4": "delivered",
        };
        return status[id] || "invalid"; // Returns invalid if the ID doesn't exist
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const status = getStatusFunction(orderId);
        setOrderStatus(status);
    };

    const getStatusBarClass = (status, step) => {
        if (status === "delivered" && step === "delivered") {
            return "bg-green-500 w-full";
        }
        if (status === "onWay" && (step === "delivered" || step === "onWay")) {
            return "bg-yellow-500 w-3/4";
        }
        if (status === "processing" && (step === "delivered" || step === "onWay" || step === "processing")) {
            return "bg-blue-500 w-1/2";
        }
        if (status === "confirmed" && (step === "delivered" || step === "onWay" || step === "processing" || step === "confirmed")) {
            return "bg-gray-500 w-1/4";
        }
        return "bg-gray-200 w-1/4";
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h2 className="text-3xl font-semibold mb-6">Track Your Order</h2>

            {/* Order Tracking Form */}
            <form onSubmit={handleSubmit} className="flex mb-6">
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="ml-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Track
                </button>
            </form>

            {/* Order Status Progress */}
            {orderStatus && orderStatus !== "invalid" && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Order Progress</h3>
                    <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                        <div
                            className={`h-full w-[0px] transition-all ${getStatusBarClass(orderStatus, "confirmed")} rounded-l-full`}
                        ></div>
                        <div
                            className={`h-full w-[0px] transition-all ${getStatusBarClass(orderStatus, "processing")} rounded-l-full`}
                        ></div>
                        <div
                            className={`h-full w-[0px] transition-all ${getStatusBarClass(orderStatus, "onWay")} rounded-l-full`}
                        ></div>
                        <div
                            className={`h-full w-[0px] transition-all ${getStatusBarClass(orderStatus, "delivered")} rounded-r-full`}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                        <div className="flex items-center space-x-2">
                            <FaCheckCircle className="text-gray-500" />
                            <span>Confirmed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaRegHourglass className="text-gray-500" />
                            <span>Processing</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaTruck className="text-gray-500" />
                            <span>On Way</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaGift className="text-gray-500" />
                            <span>Delivered</span>
                        </div>
                    </div>
                </div>
            )}

            {/* If invalid Order ID */}
            {orderStatus === "invalid" && (
                <div className="text-red-500 text-center">Invalid Order ID. Please try again.</div>
            )}
        </div>
    );
};

export default OrderTracking;
