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
            className={`w-full bg-primaryC text-white text-lg py-3 px-4 rounded-md hover:opacity-90 transition duration-300 ${loading && 'cursor-not-allowed'} ${className}`}
        >
            {loading ? <ButtonLoader /> : label}

        </button>
    );
};

export default Button;
