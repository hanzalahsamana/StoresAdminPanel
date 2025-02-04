"use client";
import React, { useState, useEffect, useRef } from "react";
import { CgInsertAfter } from "react-icons/cg";
import FormInput from "../Forms/FormInput";

const MultiSelectDropdown = ({
    defaultOptions,
    selectedOptions,
    setSelectedOptions,
    wantsCustomOption,
    placeholder = "Select",
    error = null
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(defaultOptions);
    const [localSelectedOptions, setLocalSelectedOptions] = useState(selectedOptions);
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

    useEffect(() => {
        setFilteredOptions(
            defaultOptions.filter((option) =>
                option.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

    }, [searchTerm, defaultOptions]);

    useEffect(() => {
        setSelectedOptions(localSelectedOptions);
    }, [localSelectedOptions, setSelectedOptions]);

    const handleSelect = (option) => {
        setLocalSelectedOptions((prev) => [...prev, option]);
    };

    const handleRemove = (option) => {
        setLocalSelectedOptions((prev) => prev.filter((item) => item !== option));
    };

    const handleCustomOptionSelect = () => {
        if (searchTerm.trim()) {
            setLocalSelectedOptions((prev) => [...prev, searchTerm.trim()]);
            setSearchTerm("");
        }
    };

    return (
        <div className="w-full flex flex-col ">
           
            <div ref={dropdownRef} className="relative flex flex-col w-full gap-2">
                <div onClick={() => setIsOpen(true)}>

                    <FormInput
                        value={searchTerm}
                        handleChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        placeholder={placeholder}

                    />
                </div>
                {isOpen && (
                    <div className="absolute w-full bg-white text-textC top-[51px] border rounded-sm shadow-lg z-10 transition-all max-h-[100px] customScroll overflow-y-auto">
                        {searchTerm && !filteredOptions.length && wantsCustomOption ? (
                            <div
                                className="cursor-pointer py-[12px] px-3 flex gap-2 items-center hover:bg-gray-200"
                                onClick={() => {
                                    handleCustomOptionSelect()
                                    setIsOpen(false)

                                }}
                            >
                                <span className="text-primaryC text-sm"><CgInsertAfter /></span> {searchTerm}
                            </div>
                        ) : (
                            filteredOptions.map((option, index) =>
                                !localSelectedOptions.includes(option) && (
                                    <div
                                        key={index}
                                        className="cursor-pointer py-[12px] border-b px-3 flex gap-2 items-center hover:bg-gray-200"
                                        onClick={() => {
                                            handleSelect(option)
                                            setIsOpen(false)
                                        }}
                                    >
                                        <span className="text-primaryC text-sm"><CgInsertAfter /></span> {option}
                                    </div>
                                )))}
                    </div>
                )}
            </div>
            {localSelectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {localSelectedOptions.map((option, index) => (
                        <div key={index} className="flex items-center px-2 bg-secondaryC text-textC rounded-sm">
                            <p className="max-w-[130px] text-nowrap overflow-hidden text-[10px] ">
                                {option}
                            </p>
                            <button
                                type="button"
                                onClick={() => handleRemove(option)}
                                className="ml-2 text-red-500"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}




            <div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
