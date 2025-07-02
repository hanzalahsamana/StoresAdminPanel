import React, { useState, useEffect, useRef, useMemo } from "react";
import { CgInsertAfter } from "react-icons/cg";
import { IoMdArrowDropup } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const normalizeOptions = (arr = []) =>
  arr.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item
  );

const MultiSelectDropdown = ({
  defaultOptions = [],
  selectedOptions = [],
  setSelectedOptions = () => {},
  wantsCustomOption = false,
  placeholder = "Select options",
  error = null,
  label = "",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Convert defaultOptions to array of { label, value }
  const stableDefaultOptions = useMemo(
    () => normalizeOptions(defaultOptions),
    [JSON.stringify(defaultOptions)]
  );

  // Convert selected string values to array of full objects using defaultOptions
  const resolvedSelectedOptions = useMemo(() => {
    return selectedOptions.map((val) => {
      const match = stableDefaultOptions.find((opt) => opt.value === val);
      return match || { label: val, value: val }; // fallback if custom
    });
  }, [selectedOptions, stableDefaultOptions]);

  const filteredOptions = useMemo(() => {
    return stableDefaultOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedOptions.includes(option.value)
    );
  }, [searchTerm, stableDefaultOptions, selectedOptions]);

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
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpward(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    if (!selectedOptions.includes(option.value)) {
      setSelectedOptions([...selectedOptions, option.value]);
    }
    setSearchTerm("");
  };

  const handleRemove = (value) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== value));
  };

  const handleCustomOptionSelect = () => {
    const trimmed = searchTerm.trim();
    if (
      trimmed &&
      !selectedOptions.some(
        (val) => val.toLowerCase() === trimmed.toLowerCase()
      ) &&
      !stableDefaultOptions.some(
        (opt) => opt.label.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setSelectedOptions([...selectedOptions, trimmed]);
      setSearchTerm("");
    }
  };

  const showCreateOption =
    searchTerm.trim() &&
    !selectedOptions.some(
      (val) => val.toLowerCase() === searchTerm.trim().toLowerCase()
    ) &&
    !stableDefaultOptions.some(
      (opt) => opt.label.toLowerCase() === searchTerm.trim().toLowerCase()
    ) &&
    wantsCustomOption;

  return (
    <div className="w-full flex flex-col gap-1" ref={containerRef}>
      {label && (
        <label className="text-[14px] font-medium text-textC mb-1 block">
          {label}
        </label>
      )}
      <div ref={dropdownRef} className={`relative w-full ${className}`}>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            inputRef.current?.focus();
          }}
          className={`min-h-[36px] h-full w-full flex flex-wrap items-center gap-2 px-2 py-1 border rounded-[4px] shadow-[inset_0_0px_6px_0_rgb(0_0_0_/_0.02)] cursor-text ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {resolvedSelectedOptions.map((option, index) => (
            <span
              key={index}
              className="bg-gray-200 text-[10px] flex items-center gap-1 px-[4px] py-[2px] rounded-md"
            >
              {option.label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value);
                }}
                className="hover:text-red-600"
              >
                <IoCloseOutline size={12} />
              </button>
            </span>
          ))}
          {selectedOptions.length > 0 && (
            <p
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOptions([]);
              }}
              className="text-primaryC cursor-pointer text-[10px]"
            >
              Clear All
            </p>
          )}
          <input
            type="text"
            ref={inputRef}
            value={searchTerm}
            autoComplete="off"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            className="h-full placeholder:text-sm bg-transparent placeholder:text-[#b9b9b9] flex-1 min-w-[60px] pl-[4px] border-none focus:outline-none text-sm"
          />
          <span
            className={`ml-auto mr-1 text-textTC text-[20px] transition-all ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          >
            <IoMdArrowDropup />
          </span>
        </div>

        {/* Dropdown */}
        <div
          className={`absolute w-full select-none bg-backgroundC box-content border rounded-md shadow-md z-50 transition-all duration-150 ease-in-out overflow-y-auto customScroll ${
            isOpen ? "max-h-[150px] border" : "max-h-0 border-none"
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
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              >
                {option.label}
              </div>
            ))
          ) : !showCreateOption ? (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              {!wantsCustomOption
                ? "No options found."
                : !searchTerm.length > 0
                ? "No options found. Type to add a custom option."
                : "This option is already added."}
            </div>
          ) : null}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 ">{error}</p>}
    </div>
  );
};

export default MultiSelectDropdown;
