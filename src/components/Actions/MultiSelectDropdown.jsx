"use client";
import React, { useState, useEffect, useRef } from "react";
import { CgInsertAfter } from "react-icons/cg";
import FormInput from "../Forms/FormInput";

const MultiSelectDropdown = ({
    defaultOptions = [],
    selectedOptions = [],
    setSelectedOptions,
    wantsCustomOption = false,
    placeholder = "Select",
    error = null,
    className = '',
}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(defaultOptions);
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

    const handleSelect = (option) => {
        setSelectedOptions([...selectedOptions, option]);
    };

    const handleRemove = (option) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };

    const handleCustomOptionSelect = () => {
        if (searchTerm.trim()) {
            setSelectedOptions([...selectedOptions, searchTerm.trim()]);
            setSearchTerm("");
        }
    };

    return (
        <div className="w-full flex flex-col ">

            <div ref={dropdownRef} className="relative flex flex-col w-full gap-2">
                <div>

                    <FormInput
                        value={searchTerm}
                        onfocus={() => setIsOpen(true)}
                        handleChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        placeholder={placeholder}
                        className={className}
                    />
                </div>
                <div className={`absolute w-full bg-white text-textC top-[51px] rounded-sm shadow-lg z-10 transition-all ease-linear duration-200 ${isOpen ? 'max-h-[160px] border' : 'max-h-0'} customScroll overflow-y-auto`}>
                    {searchTerm && !filteredOptions.length && wantsCustomOption ? (
                        <div
                            className="cursor-pointer py-[12px] px-3 flex gap-2 items-center hover:bg-gray-100"
                            onClick={() => {
                                handleCustomOptionSelect();
                                setIsOpen(false);
                            }}
                        >
                            <span className="text-primaryC"><CgInsertAfter /></span> {searchTerm}
                        </div>
                    ) : filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) =>
                            !selectedOptions.includes(option) ? (
                                <div
                                    key={index}
                                    className="cursor-pointer py-[8px] text-[12px] border-b px-3 flex gap-2 items-center hover:bg-gray-100"
                                    onClick={() => {
                                        handleSelect(option);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className="text-primaryC"><CgInsertAfter /></span> {option}
                                </div>
                            ) : (
                                <div>{console.log(filteredOptions, "jjjj")}</div>
                            )
                        )
                    ) : (
                        <div className="py-[8px] text-[12px] text-center text-gray-500">
                            No data found
                        </div>
                    )}
                </div>

            </div>
            {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {selectedOptions.map((option, index) => (
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
