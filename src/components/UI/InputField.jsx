import React from 'react';

const InputField = ({
  type = 'text',
  placeholder = 'Enter title',
  value,
  onChange,
  className = '',
  disabled = false
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full max-w-lg px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${className} ${
        disabled ? 'bg-gray-200 cursor-not-allowed' : ''
      }`}
    />
  );
};

export default InputField;
