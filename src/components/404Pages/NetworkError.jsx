"use client";
import React from "react";
import NotFoundImage from "../../Assets/Images/no-internet.png";

const NetworkError = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <div className="max-w-md bg-transparent rounded-2xl p-8">
                <div className="">
                    <img
                        src={NotFoundImage.src}
                        alt="Network Error Illustration"
                        className="w-[320px] mx-auto"
                    />
                </div>

                <h1 className="text-3xl mt-[20px] font-bold text-gray-900">Connection out with server </h1>
                <p className="text-gray-600 mt-4">
                    Looks like the server is down or there's a network issue. Please check your connection or try again later.
                </p>

                <div className="mt-10">
                    <button
                        onClick={() => location.reload()}
                        className="bg-black text-backgroundC px-5 py-2 rounded-lg font-medium hover:opacity-85 transition-all"
                    >
                        Try Again 
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NetworkError;
