"use client";
import React, { useState, useEffect, useRef } from "react";
import { CgInsertAfter } from "react-icons/cg";
import FormInput from "../Forms/FormInput";
import { IoMdArrowDropup } from "react-icons/io";

const DropDown = ({
    defaultOptions = [],
    selectedOption = "",
    setSelectedOption = ()=>{},
    placeholder = "Select",
    required = true,
    error = null,
    className = '',
    wantsCustomOption = false,
    label = "label",
    layout = null,
    size = 'small'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [options, setOptions] = useState([]);
    const dropdownRef = useRef(null);
    const dropdownOptionsRef = useRef(null);

    // Normalize options: convert string array to object array
    useEffect(() => {
        const normalized = defaultOptions.map(opt =>
            typeof opt === "string" ? { value: opt, label: opt } : opt
        );
        setOptions(normalized);
    }, [defaultOptions]);

    // Update searchTerm if selectedOption changes
    useEffect(() => {
        const selectedObj = options.find(opt => opt.value === selectedOption);
        setSearchTerm(selectedObj?.label || "");
    }, [selectedOption, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset scroll on search term change
    useEffect(() => {
        if (dropdownOptionsRef.current) {
            dropdownOptionsRef.current.scrollTop = 0;
        }
    }, [searchTerm]);

    const handleSelect = (option) => {
        setIsOpen(false);
        setSelectedOption(option.value);
        setSearchTerm(option.label);
    };

    const handleCustomOptionSelect = () => {
        const trimmed = searchTerm.trim();
        if (trimmed && !options.find(opt => opt.label === trimmed)) {
            const newOption = { value: trimmed, label: trimmed };
            setOptions([newOption, ...options]);
            setSelectedOption(trimmed);
            setSearchTerm(trimmed);
        }
    };

    const showCreateOption =
        wantsCustomOption && searchTerm?.trim() && !options.find(opt => opt.label === searchTerm.trim());

    return (
        <div className={`w-full flex flex-col`}>
            <div ref={dropdownRef} className="relative flex flex-col w-full gap-2">
                <div onClick={() => setIsOpen((prev) => !prev)}>
                    <FormInput
                        // onClick={() => setIsOpen((prev) => !prev)}
                        // onFocus={() => setIsOpen(!isOpen)}
                        error={error}
                        value={searchTerm}
                        readOnly={!wantsCustomOption}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        placeholder={placeholder}
                        className={className}
                        label={label}
                        size={size}
                        layout={layout}
                        required={required}
                        suffix={
                            <span className={`text-textTC text-[20px] transition-all ${isOpen ? "rotate-0" : "rotate-180"}`}>
                                <IoMdArrowDropup />
                            </span>
                        }
                    />
                </div>


                <div
                    ref={dropdownOptionsRef}
                    className={`absolute top-[100%] mt-[4px] w-full bg-backgroundC box-content border rounded-md shadow-md z-50 transition-all duration-150 ease-in-out overflow-y-auto customScroll ${isOpen ? "max-h-[150px] border" : "max-h-0 border-none"}`}
                >
                    {showCreateOption && (
                        <div
                            className="px-3 py-2 text-sm text-blue-600 cursor-pointer hover:bg-blue-50 flex items-center gap-2"
                            onClick={handleCustomOptionSelect}
                        >
                            <CgInsertAfter />
                            Add "<span className="font-medium">{searchTerm}</span>"
                        </div>
                    )}

                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`px-3 py-2 text-sm cursor-pointer ${selectedOption === option.value ? 'bg-[#e2e2e4] text-gray-700' : 'hover:bg-gray-100'}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDown;
