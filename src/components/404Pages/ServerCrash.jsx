"use client";
import React from "react";
import ServerCrashImage from "../../Assets/Images/server-crash.png";

const ServerCrash = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="max-w-md bg-transparent rounded-2xl p-8">
        <div>
          <img
            src={ServerCrashImage.src}
            alt="Server Crash Illustration"
            className="w-[280px] mx-auto"
          />
        </div>

        <h1 className="text-3xl mt-[20px] font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="text-gray-600 mt-4">
          Oops! Something went wrong on our end. Please try again later.
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

export default ServerCrash;
