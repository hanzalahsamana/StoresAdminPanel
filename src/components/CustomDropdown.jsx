"use client";
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";


const CustomDropdown = ({ selectedValue, setSelectedValue, options, classes }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectOption = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    return (
        <div className={`relative w-max ${classes ?? 'z-[1000]'}`}>
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className=" w-full text-[12px] px-4 py-2 text-left bg-white border border-borderC rounded-md focus:outline-none"
            >
                {selectedValue || "Select an option"}
                <span className="float-right pl-[10px]"><IoIosArrowDown /></span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul className={`absolute animate-bounceSlow w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg`}>
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => selectOption(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
