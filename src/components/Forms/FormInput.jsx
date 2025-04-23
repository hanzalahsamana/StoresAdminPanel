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
  className = '',
  onfocus = null,
  actionIcon = null,
  layoutStyle = '1',
  onblur = null,
}) => {

  return (
    <div className={`w-full relative`}>
      {layoutStyle === '2' && (
        <label className="text-[20px] ">
          {placeholder}
        </label>
      )}
      <input
        type={type}
        onFocus={onfocus}
        name={name}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        placeholder={layoutStyle === '2' ? placeholder : ''}
        className={`Inputs pr-[40px] h-[50px] text-textTC bg-backgroundC pl-[20px] flex items-center rounded-md outline-[#3973B0] p-2 border w-full ${className} ${error ? "border-red-500" : "border-[#a6a6a689]"
          } rounded`}
      />
      {layoutStyle === '1' && (
        <label
          className={`pointer-events-none transition-all bg-backgroundC p-[4px]  absolute left-3  ${error ? 'text-red-500':'text-[#969393]'} ${value || value === 0
            ? "top-[-10px] text-[10px]"
            : "top-[12px]"
            }`}
        >
          {placeholder}{required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {actionIcon && actionIcon}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default FormInput;



