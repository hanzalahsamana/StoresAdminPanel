"use client";

import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const Button = ({
    type = "button",
    label = "Click",
    className = "",
    loading = false,
    size = "large",
    variant = "primary", // Added variant prop
    action = () => { },
    active = true,
}) => {
    // Define button styles based on variant
    const buttonStyles = {
        primary: "bg-primaryC text-white",
        outline: "border-2 border-primaryC text-primaryC bg-transparent  leading-[calc(1em)]",
        danger: "bg-red-600 text-white",
        black: "bg-black text-white",
        warning: "bg-yellow-500 text-black",
    };
    const buttonSizes = {
        large: "text-[17px] py-[12px] px-[25px] min-w-[150px] ",
        small: "text-[14px] py-[7px] px-[20px]"
    };

    return (
        <button
            onClick={action}
            disabled={loading || !active}
            type={type}
            className={`w-full flex gap-2 justify-center  rounded-sm hover:opacity-90 transition duration-300
                ${buttonSizes[size]} 
                ${loading || !active ? 'cursor-not-allowed text-[#4f4c4c89] !bg-[#c5c5c589]' : buttonStyles[variant] || buttonStyles.primary} 
                ${className}`}
        >
            {loading
                ? <ButtonLoader />
                : label}
        </button>
    );
};

export default Button;
