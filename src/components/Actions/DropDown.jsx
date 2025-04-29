"use client";
import React, { useState, useEffect, useRef } from "react";
import { CgInsertAfter } from "react-icons/cg";
import FormInput from "../Forms/FormInput";
import { IoMdArrowDropup } from "react-icons/io";

const DropDown = ({
    defaultOptions = [],
    selectedOption = "",
    setSelectedOption,
    placeholder = "Select",
    required = true,
    error = null,
    className = '',
    wantsCustomOption = false, // new prop to enable custom option
    label = "label",
    layout = null,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(selectedOption);
    const [options, setOptions] = useState(defaultOptions);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setIsOpen(false);
        setSelectedOption(option);
        setSearchTerm(option); // Set selected value in the input
    };

    const handleCustomOptionSelect = () => {
        const trimmed = searchTerm.trim();
        if (trimmed && !options.includes(trimmed)) {
            setOptions([...options, trimmed]); // Add custom option to options list
            setSelectedOption(trimmed); // Set the custom option as selected
            setSearchTerm(trimmed); // Update the input field
        }
    };

    const showCreateOption =
        wantsCustomOption && searchTerm.trim() && !options.includes(searchTerm.trim());

    return (
        <div className={`w-full flex flex-col ${className}`}>
            <div ref={dropdownRef} className="relative flex flex-col w-full gap-2">
                <div>
                    <FormInput
                        onFocus={() => setIsOpen(true)}
                        error={error}
                        value={searchTerm}
                        readOnly={!wantsCustomOption}
                        handleChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        placeholder={placeholder}
                        className={className}
                        label={label}
                        layout={layout}
                        actionIcon={<span
                            className={`ml-auto absolute right-0 text-textTC text-[20px] transition-all ${isOpen ? "rotate-0" : "rotate-180"
                                }`}
                        >
                            <IoMdArrowDropup />
                        </span>}
                    />
                </div>

                {/* Dropdown options */}
                <div
                    className={`absolute top-[100%] mt-[4px] w-full bg-white box-content border rounded-md shadow-md z-50 transition-all duration-150 ease-in-out overflow-y-auto customScroll ${isOpen ? "max-h-[150px] border" : "max-h-0 border-none"}`}
                >
                    {showCreateOption && (
                        <div
                            className="px-3 py-2 text-sm text-blue-600 cursor-pointer hover:bg-blue-50 flex items-center gap-2"
                            onClick={handleCustomOptionSelect}
                        >
                            <CgInsertAfter />
                            Create "<span className="font-medium">{searchTerm}</span>"
                        </div>
                    )}

                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`px-3 py-2 text-sm cursor-pointer  ${selectedOption === option ? 'bg-[#e2e2e4] text-gray-700' : 'hover:bg-gray-100'}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDown;
