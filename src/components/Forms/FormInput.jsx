"use client";

import React from "react";
import "../../Styles/globals.css"

const FormInput = ({
  handleChange,
  value,
  name,
  error,
  placeholder = "Enter Text",
  type = "text",
  readOnly = false,
  disabled = false,
  required = true,
  actionIcon = null,
}) => {


  return (
    <div className={`w-full relative`}>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        className={`Inputs pr-[40px] h-[50px] bg-backgroundC pl-[20px] flex items-center rounded-md outline-[#3973B0] p-2 border w-full ${error ? "border-red-500" : "border-[#a6a6a668]"
          } rounded`}
      />
      <label
        className={`pointer-events-none transition-all bg-backgroundC p-[4px]  absolute left-3 text-[#656565] ${value || value === 0
          ? "top-[-10px] text-[10px]"
          : "top-[12px]"
          }`}
      >
        {placeholder}{required && <span className="text-red-500"> *</span>}
      </label>
      {actionIcon && actionIcon}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default FormInput;



