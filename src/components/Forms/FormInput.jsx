
"use client";

import React from "react";
import "../../Styles/globals.css";

const FormInput = ({
  name,
  value,
  handleChange,
  placeholder = "Enter text",
  type = "text",
  readOnly = false,
  disabled = false,
  required = true,
  error = "",
  className = "",
  onClick = null,
  onFocus = null,
  onBlur = null,
  actionIcon = null,
  size = "small", // "small" or "large"
  layout = "floating", // "floating" or "label"
  label = "Name",
  autocomplete = "on", // "on" or "off"
  labelClassname = "",

}) => {
  const inputSizeClass = size === "small" ? "text-sm h-9" : "text-base h-11";
  return (
    <div className="relative w-full ">
      {layout === "label" && (
        <label className="text-[14px] font-medium text-textC mb-1 block">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative w-full">


        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autocomplete}
          placeholder={layout !== "floating" ? placeholder : ''}
          className={`Inputs  placeholder:text-sm   placeholder:text-[#b9b9b9] shadow-[inset_0_0px_6px_0_rgb(0_0_0_/_0.02)] px-3 text-textTC  flex items-center border-[1.3px] w-full rounded-[4px] ${inputSizeClass} ${error ? "border-red-500 outline-none bg-red-50" : "border-gray-300 bg-backgroundC outline-[#297ed9]"
            } ${className}`}
        />
        {actionIcon && <div className={`absolute right-3 ${size === "large" ? 'bottom-[32px]' : 'bottom-[28px]'} transform -translate-y-1/2`}>{actionIcon}</div>}
        {layout === "floating" && (
          <label
            className={`absolute left-3 px-1  ${labelClassname} transition-all text-[#b9b9b9] ${value || value === 0 ? "top-[-10px] text-xs bg-backgroundC" : `${size === "large" ? "top-[12px] text-base" : "top-[8px] text-sm"}`} pointer-events-none`}
          >
            {placeholder}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
      </div>



      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
