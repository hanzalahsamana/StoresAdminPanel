"use client";
import React, { useState, useEffect, useRef } from "react";
import { CgInsertAfter } from "react-icons/cg";
import FormInput from "../Forms/FormInput";

const DropDown = ({
    defaultOptions = [],
    selectedOption = "",
    setSelectedOption,
    placeholder = "Select",
    required = true,
    error = null,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(false)
        setSelectedOption(option)
    };


    return (
        <div className={`w-full flex flex-col ${className}`}>

            <div ref={dropdownRef} className="relative flex flex-col w-full gap-2">
                <div>

                    <FormInput
                        onfocus={() => setIsOpen(true)}
                        value={selectedOption}
                        handleChange={(e) => {
                            setIsOpen(true);
                        }}
                        readOnly={true}
                        placeholder={placeholder}
                        className={className}


                    />
                </div>


                {/* {isOpen && ( */}
                <div className={`absolute w-full bg-white text-textC top-[51px] rounded-sm shadow-lg z-10 transition-all ease-linear duration-200 overflow-hidden ${isOpen ? 'max-h-[160px] border' : 'max-h-0'}`}>
    {defaultOptions.map((option, index) => (
        <div
            key={index}
            className={`cursor-pointer py-[8px] text-[12px] border-b px-3 flex gap-2 items-center ${selectedOption === option ? 'bg-secondaryC' : 'hover:bg-gray-100'}`}
            onClick={() => handleSelect(option)}
        >
            <span className="text-primaryC"><CgInsertAfter /></span> {option}
        </div>
    ))}
</div>
                {/* )} */}
            </div>

            <div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default DropDown;
