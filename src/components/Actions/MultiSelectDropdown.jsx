"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { CgInsertAfter } from "react-icons/cg";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const MultiSelectDropdown = ({
    defaultOptions = [],
    selectedOptions = [],
    setSelectedOptions = () => { },
    wantsCustomOption = false,
    placeholder = "Select options",
    error = null,
    label = '',
    className = "",
}) => {


    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(defaultOptions);
    const [openUpward, setOpenUpward] = useState(false);
    const dropdownRef = useRef(null);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const stableDefaultOptions = useMemo(() => [...defaultOptions], [JSON.stringify(defaultOptions)]);
    const stableSelectedOptions = useMemo(() => [...selectedOptions], [JSON.stringify(selectedOptions)]);

    const filteredData = useMemo(() => {
        return stableDefaultOptions.filter(
            (option) =>
                option.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !stableSelectedOptions.includes(option)
        );
    }, [searchTerm, stableDefaultOptions, stableSelectedOptions]);


    useEffect(() => {

        setFilteredOptions(filteredData)
    }, [filteredData])
    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            setOpenUpward(spaceBelow < 200 && spaceAbove > spaceBelow);
        }
    }, [isOpen]);

    const handleSelect = (option) => {
        if (!selectedOptions.includes(option)) {
            setSelectedOptions([...selectedOptions, option]);
        }
        setSearchTerm(""); // Clear the search term after selection
    };

    const handleRemove = (option) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };

    const handleCustomOptionSelect = () => {
        const trimmed = searchTerm.trim().toLowerCase(); // Convert the search term to lowercase
        if (
            trimmed &&
            !selectedOptions.some(option => option.toLowerCase() === trimmed) && // Case-insensitive check for selectedOptions
            !defaultOptions.some(option => option.toLowerCase() === trimmed) // Case-insensitive check for defaultOptions
        ) {
            setSelectedOptions([...selectedOptions, searchTerm.trim()]); // Add the custom option with original casing to the selected list
            setSearchTerm(""); // Clear the search term after adding the custom option
        }
    };


    const showCreateOption =
        searchTerm.trim() &&
        !selectedOptions.some(option => option.toLowerCase() === searchTerm.trim().toLowerCase()) && // Case-insensitive check for selectedOptions
        !defaultOptions.some(option => option.toLowerCase() === searchTerm.trim().toLowerCase()) && // Case-insensitive check for defaultOptions
        wantsCustomOption;



    return (
        <div className="w-full flex flex-col gap-1" ref={containerRef}>
            {label && (
                <label className="text-[14px] font-medium text-textC mb-1 block">
                    {label}
                </label>)}
            <div ref={dropdownRef} className={`relative w-full ${className}`}>
                <div
                    onClick={() => {
                        setIsOpen(true);
                        inputRef.current?.focus();;
                    }}

                    className={`min-h-[36px] h-full w-full flex flex-wrap items-center gap-2 px-2 py-1 border rounded-[4px] shadow-[inset_0_0px_6px_0_rgb(0_0_0_/_0.02)] cursor-text ${error ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    {selectedOptions.map((option, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-[10px] flex items-center gap-1 px-[4px] py-[2px] rounded-md"
                        >
                            {option}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(option);
                                }}
                                className="hover:text-red-600"
                            >
                                <IoCloseOutline size={12} />
                            </button>
                        </span>
                    ))}
                    {selectedOptions.length > 0 && (
                        <p onClick={(e) => { e.stopPropagation(); setSelectedOptions([]) }} className="text-primaryC cursor-pointer text-[10px]">Clear All</p>
                    )}

                    <input
                        type="text"
                        id="DropownInput"
                        ref={inputRef}
                        value={searchTerm}
                        autoComplete="off"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        placeholder={selectedOptions.length === 0 ? placeholder : ""}
                        className="h-full placeholder:text-sm bg-transparent  placeholder:text-[#b9b9b9] flex-1 min-w-[60px] pl-[4px] border-none focus:outline-none text-sm"
                    />

                    <span
                        className={`ml-auto mr-1 text-textTC text-[20px] transition-all ${isOpen ? "rotate-0" : "rotate-180"
                            }`}
                    >
                        <IoMdArrowDropup />
                    </span>
                </div>

                {/* Dropdown options */}
                <div
                    className={`absolute w-full select-none bg-backgroundC box-content border rounded-md shadow-md z-50 transition-all duration-150 ease-in-out overflow-y-auto customScroll ${isOpen ? "max-h-[150px] border" : "max-h-0 border-none"
                        }`}
                    style={{
                        top: openUpward ? "auto" : "100%",
                        bottom: openUpward ? "100%" : "auto",
                        marginTop: openUpward ? "0" : "4px",
                        marginBottom: openUpward ? "4px" : "0",
                    }}
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

                    {filteredOptions.length ? (
                        filteredOptions.map((option, index) =>
                            !selectedOptions.includes(option) ? (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                >
                                    {option}
                                </div>
                            ) : null
                        )
                    ) : !showCreateOption ? (
                        <div className="px-3 py-2 text-sm text-gray-500 text-center">
                            {!wantsCustomOption ? 'No options found.' : !searchTerm.length > 0 ? 'No options found. Type to add a custom option.' : 'This option is already added.'}
                        </div>
                    ) : null}
                </div>
            </div>

            {error && <p className="text-xs text-red-500 ">{error}</p>}
        </div>
    );
};

export default MultiSelectDropdown;
