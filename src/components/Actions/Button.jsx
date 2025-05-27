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
    icon = null
}) => {
    // Define button styles based on variant
    const buttonStyles = {
        primary: "bg-primaryC text-backgroundC",
        outline: "border-2 border-primaryC text-primaryC bg-transparent  leading-[calc(1em)]",
        danger: "bg-red-600 text-backgroundC",
        black: "bg-black text-backgroundC",
        white: "bg-backgroundC border text-textC border-borderC",
        warning: "bg-yellow-500 text-black",
        text: "bg-transparent text-primaryC py-0 !px-[5px]",
    };
    const buttonSizes = {
        large: "text-[14px] h-[40px] px-[10px] min-w-[150px] ",
        small: "text-[14px] py-[7px] px-[20px] w-max"
    };

    return (
        <button
            onClick={action}
            disabled={loading || !active}
            type={type}
            className={`w-full  flex gap-2 justify-center  rounded-[4px] hover:opacity-90 transition duration-300
                ${buttonSizes[size]} 
                ${loading || !active ? 'cursor-not-allowed text-[#4f4c4c89] !bg-[#c5c5c589]' : buttonStyles[variant] || buttonStyles.primary} 
                ${className}`}
        >
            {loading
                ? <ButtonLoader />
                : (
                    <div className="flex flex-1 items-center">
                        {icon&&<span>{icon}</span>}
                        <span className="flex-1">{label}</span>
                    </div>
                )}
        </button>
    );
};

export default Button;
