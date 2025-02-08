"use client";

import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const Button = ({
    type = "button",
    label = "Click",
    className = "",
    loading = false,

    action = () => { },
}) => {
    return (
        <button
            onClick={action}
            disabled={loading}
            type={type}
            className={`w-full flex gap-2 justify-center bg-primaryC text-white text-lg py-3 px-[25px] rounded-md hover:opacity-90 transition duration-300 ${loading && 'cursor-not-allowed bg-[#a39c9c]'} ${className}`}
        >
            {loading 
            ? <ButtonLoader className={`  `} /> 
            : label}

        </button>
    );
};

export default Button;
