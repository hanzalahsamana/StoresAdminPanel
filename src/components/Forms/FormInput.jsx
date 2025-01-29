"use client";

import React from "react";
import "../../Styles/globals.css"

const FormInput = ({
  type,
  placeholder,
  handleChange,
  field,
  formData,
  errors,
}) => {

  const abc =
    (formData.originalPrice ? formData.originalPrice : 0) -
    (formData.originalPrice ? formData.originalPrice : 0) *
    ((formData.discount ? formData.discount : 0) / 100);
  formData.discountedPrice = abc;

  return (
    <div className={`w-full relative`}>
      <input
        type={type}
        name={field}
        onChange={handleChange}
        readOnly={field === "discountedPrice" ? true : false}
        value={field === "discountedPrice" ? abc : formData[field]}
        className={`Inputs h-[50px] bg-backgroundC pl-[20px] flex items-center rounded-md outline-[#3973B0] p-2 border w-full ${errors[field] ? "border-red-500" : "border-[#a1a1a1]"
          } rounded`}
      />
      <label
        className={`transition-all bg-backgroundC p-[4px]  absolute left-3 text-[#656565] ${formData[field] || formData[field] === 0
          ? "top-[-10px] text-[10px]"
          : "top-[12px]"
          }`}
      >
        {placeholder}
      </label>
      {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
    </div>
  );
};

export default FormInput;
