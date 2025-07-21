
"use client";

import React from "react";

const FormInput = ({
  type = "text",
  name,
  value,
  onChange,
  label = "Name",
  placeholder = null,
  variant = "default",
  size = "small", // "small" or "large"
  suffix = null,
  prefix = null,
  error = null,
  readOnly = false,
  disabled = false,
  required = true,
  autocomplete = "on", // "on" or "off"
  onClick = null,
  onFocus = null,
  onBlur = null,
  className = "",
}) => {

  const sizeClasses = {
    short: 'w-max text-sm rounded-md !h-8 ',
    small: 'text-sm rounded-md h-9 w-full',
    large: 'text-base rounded-md h-11 w-full',
  }

  const variantClasses = {
    default: {
      text: 'text-gray-600',
      lightBg: 'bg-white',
      bg: 'bg-gray-200',
      border: 'border-gray-300',
      outline: 'focus-within:border-2 focus-within:border-primaryC'
    },
    primary: {
      text: 'text-blue-600',
      lightBg: 'bg-blue-50',
      bg: 'bg-blue-200',
      border: 'border-blue-300'
    },
    error: {
      text: 'text-red-600',
      lightBg: 'bg-red-50',
      bg: 'bg-red-200',
      border: 'border-red-300'
    },
    warn: {
      text: 'text-yellow-600',
      lightBg: 'bg-yellow-50',
      bg: 'bg-yellow-200',
      border: 'border-yellow-300'
    },
    success: {
      text: 'text-green-600',
      lightBg: 'bg-green-50',
      bg: 'bg-green-200',
      border: 'border-green-300'
    },
  };

  const inputSizeClass = sizeClasses?.[size] || sizeClasses.small;
  const variantClass = error ? variantClasses?.error : variantClasses?.[variant] || variantClasses.default;


  return (
    <div className="relative w-full ">
      {label && (
        <label className="text-[15px] font-medium text-textC mb-1 block">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className={`flex border ${inputSizeClass} ${variantClass?.border} ${variantClass?.lightBg} ${variantClass?.outline} ${className} `}>
        {prefix && (
          <PrefSuffBox data={prefix} className={'rounded-l-md'} variantClass={variantClass} />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autocomplete}
          placeholder={placeholder}
          className={`placeholder:text-sm !outline-none bg-transparent w-full placeholder:text-[#b9b9b9] shadow-[inset_0_0px_6px_0_rgb(0_0_0_/_0.02)] px-3 text-textTC h-full`}
        />
        {suffix && (
          <PrefSuffBox data={suffix} className={'rounded-r-md'} variantClass={variantClass} />
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div >
  );
};

const PrefSuffBox = ({ data, className, variantClass }) => {
  return (
    <div className={` font-semibold h-full px-2 flex justify-center gap-3 items-center ${variantClass?.bg} ${variantClass?.text} ${className}`}>
      {data}
    </div>
  )
}

export default FormInput;
