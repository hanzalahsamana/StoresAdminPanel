"use client";

import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const Button = ({
    type = "button",
    label = "Click",
    className = "",
    loading = false,
    variant = "primary", // Added variant prop
    action = () => { },
}) => {
    // Define button styles based on variant
    const buttonStyles = {
        primary: "bg-primaryC text-white",
        outline: "border-2 border-primaryC text-primaryC bg-transparent  leading-[calc(1em)]",
        danger: "bg-red-600 text-white",
        black: "bg-black text-white",
        warning: "bg-yellow-500 text-black",
    };

    return (
        <button
            onClick={action}
            disabled={loading}
            type={type}
            className={`w-full flex gap-2 justify-center text-[17px] py-[12px] px-[25px] rounded-sm min-w-[150px] hover:opacity-90 transition duration-300 
                ${loading ? 'cursor-not-allowed bg-gray-400' : buttonStyles[variant] || buttonStyles.primary} 
                ${className}`}
        >
            {loading 
                ? <ButtonLoader /> 
                : label}
        </button>
    );
};

export default Button;
