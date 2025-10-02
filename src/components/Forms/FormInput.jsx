'use client';

import React, { forwardRef } from 'react';

const FormInput = forwardRef(
  (
    {
      type = 'text',
      name,
      value,
      onChange,
      label = '',
      placeholder = null,
      variant = 'default',
      size = 'small', // "small" or "large"
      suffix = null,
      prefix = null,
      error = null,
      readOnly = false,
      disabled = false,
      required = true,
      autocomplete = 'on', // "on" or "off"
      onClick = null,
      onFocus = null,
      onBlur = null,
      className = '',
      isStore = false,
    },
    ref
  ) => {
    const sizeClasses = {
      short: 'w-max text-sm rounded-md !h-8 ',
      small: 'text-sm rounded-md h-9 w-full',
      large: 'text-base rounded-md h-11 w-full',
    };

    const variantClasses = {
      default: {
        text: !isStore ? 'text-gray-600' : 'text-[var(--tmp-ltxt)]',
        lightBg: !isStore ? 'bg-white' : 'bg-var(--tmp-pri)',
        bg: !isStore ? 'bg-gray-200' : 'bg-var(--tmp-pri)',
        border: !isStore ? 'border-[#dedede]' : 'border-[var(--tmp-lBor)]',
        outline: !isStore ? 'focus-within:ring-1 focus-within:ring-black' : 'focus-within:ring-1 focus-within:ring-[var(--tmp-lBor)]',
      },
      primary: {
        text: 'text-blue-600',
        lightBg: 'bg-blue-50',
        bg: 'bg-blue-200',
        border: 'border-blue-300',
        outline: 'focus-within:ring-2 focus-within:ring-primaryC',
      },
      error: {
        text: 'text-red-600',
        lightBg: '',
        bg: 'bg-red-200',
        border: 'border-red-500',
      },
      warn: {
        text: 'text-yellow-600',
        lightBg: '',
        bg: 'bg-yellow-200',
        border: 'border-yellow-500',
      },
      success: {
        text: 'text-green-600',
        lightBg: '',
        bg: 'bg-green-200',
        border: 'border-green-500',
      },
    };

    const inputSizeClass = sizeClasses?.[size] || sizeClasses.small;
    const variantClass = error ? variantClasses?.error : variantClasses?.[variant] || variantClasses.default;

    return (
      <div className="relative w-full ">
        {label && (
          <label className={`text-[15px] font-medium ${!isStore ? 'text-textC' : 'text-[var(--tmp-ltxt)]'}  mb-1 block`}>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <div ref={ref} className={`flex border ${inputSizeClass} ${variantClass?.border} ${variantClass?.lightBg} ${variantClass?.outline} ${className} `}>
          {prefix && <PrefSuffBox data={prefix} className={'rounded-l-md'} variantClass={variantClass} />}
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
            className={` !outline-none bg-transparent w-full placeholder:text-[#797979]  px-3 text-textC h-full ${isStore && 'rounded-md !text-[var(--tmp-ltxt)]'}`}
          />
          {suffix && <PrefSuffBox data={suffix} className={'rounded-r-md'} variantClass={variantClass} />}
        </div>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

const PrefSuffBox = ({ data, className, variantClass }) => {
  return (
    <div className={` font-medium h-full ${typeof data === 'string' ? 'px-2' : ''} flex justify-center gap-3 items-center ${variantClass?.bg} ${variantClass?.text} ${className}`}>
      {data}
    </div>
  );
};

export default FormInput;
