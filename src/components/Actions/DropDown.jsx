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
    className='',
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
                <div onClick={() => setIsOpen(true)} >

                    <FormInput
                        value={selectedOption}
                        handleChange={(e) => {
                            setIsOpen(true);
                        }}
                        readOnly={true}
                        placeholder={placeholder}
                        className={className}

                    />
                </div>


                {isOpen && (
                    <div className="absolute w-full bg-white text-textC top-[51px] border rounded-sm shadow-lg z-10 transition-all max-h-[100px] customScroll overflow-y-auto">
                        {defaultOptions.map((option, index) =>
                            <div
                                key={index}
                                className="cursor-pointer py-[12px] border-b px-3 flex gap-2 items-center hover:bg-gray-200"
                                onClick={() => {
                                    handleSelect(option)
                                }}
                            >
                                <span className="text-primaryC text-sm"><CgInsertAfter /></span> {option}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default DropDown;
