import React from "react";
import './style.css'
const FormInput = ({ type, placeholder, handleChange, field, formData, errors }) => {

    const abc = (formData.originalPrice ? formData.originalPrice : 0) - ((formData.originalPrice ? formData.originalPrice : 0) * ((formData.discount ? formData.discount : 0) / 100));
    formData.discountedPrice = abc;

    return (
        <div className={`mb-4 w-full relative`}>
            <input
                type={type}
                readOnly={field === 'discountedPrice' ? true : false}
                className={`Inputs mb-[6px] h-[50px] pl-[20px] flex items-center rounded-md outline-[#3973B0] p-2 border-2 w-full ${errors[field] ? "border-red-500" : "border-[#a1a1a1]"} rounded`}
                name={field}
                value={field === 'discountedPrice' ? abc : formData[field]}
                onChange={handleChange}
            />
            <label
                className={`transition-all absolute left-3 text-[#656565] ${formData[field] || formData[field] === 0 ? "top-[3px] text-[10px]" : "top-4"}`}
            >
                {placeholder}
            </label>
            {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
        </div>
    );
};

export default FormInput;
