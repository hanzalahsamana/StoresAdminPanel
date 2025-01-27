import React from "react";

const FormInput = ({ type, placeholder , handleChange , field , formData , errors }) => {
  return (
    <div className='mb-4 w-full'>
      <input type={type} placeholder={placeholder}
        className={`mb-[6px] h-[50px] pl-[20px] flex items-center rounded-md outline-[#3973B0] p-2 border w-full ${
          errors[field] ? "border-red-500" : "border-[#a1a1a1]"
        } rounded`}
        name={field}
        value={formData[field]}
        onChange={handleChange}
      />
      {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
    </div>
  );
};

export default FormInput;
