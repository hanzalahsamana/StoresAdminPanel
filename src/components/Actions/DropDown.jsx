"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CgInsertAfter } from "react-icons/cg";
import FormInput from "../Forms/FormInput";
import { IoMdArrowDropup } from "react-icons/io";
import { isEqual } from "lodash";

const DropDown = ({
  defaultOptions = [],
  selectedOption = '', 
  setSelectedOption = () => {},
  placeholder = 'Select',
  required = true,
  error = null,
  className = '',
  wantsCustomOption = false,
  label = '',
  layout = null,
  size = 'small',
  variant = 'default',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const normalized = defaultOptions.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));
    setOptions((prev) => {
      if (!IsArrayEqual(prev, normalized)) {
        return normalized;
      }
      return prev;
    });
  }, [defaultOptions]);

    useEffect(() => {
        const normalized = defaultOptions.map((opt) =>
            typeof opt === "string" ? { value: opt, label: opt } : opt
        );
        setOptions((prev) => {
            if (!isEqual(prev, normalized)) {
                return normalized;
            }
            return prev;
        });
    }, [defaultOptions]);
  useEffect(() => {
    const selectedObj = options.find((opt) => opt.value === selectedOption);
    setSearchTerm(selectedObj?.label || '');
  }, [selectedOption, options]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scrollTop = 0;
    }
  }, [searchTerm]);

  const handleSelect = (option) => {
    setVisible(false);
    setSelectedOption(option.value);
    setSearchTerm(option.label);
  };

  const handleCustomOptionSelect = () => {
    const trimmed = searchTerm.trim();
    if (trimmed && !options.find((opt) => opt.label === trimmed)) {
      const newOption = { value: trimmed, label: trimmed };
      setOptions([newOption, ...options]);
      setSelectedOption(trimmed);
      setSearchTerm(trimmed);
    }
    setVisible(false);
  };

  const toggleDropdown = () => {
    setVisible((prev) => {
      const newVal = !prev;
      return newVal;
    });
  };

  useEffect(() => {
    const button = buttonRef.current;
    const menu = menuRef.current;
    if (button && menu) {
      const buttonRect = button.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();

      console.log(menuRect.height);
      console.log(buttonRect?.bottom);

      let left = 0;
      let top = 0;
      let width = buttonRect.width;

      const hasSpaceLeft = buttonRect.left > menuRect.width;
      const hasSpaceBottom = buttonRect.bottom > menuRect.height;

      if (!hasSpaceLeft) {
        left = buttonRect.left;
      } else {
        left = buttonRect.left;
      }

      if (hasSpaceBottom) {
        top = buttonRect.bottom;
      } else {
        top = buttonRect.top - menuRect.height;
      }

      setPosition({ top, left, width });
    }
  }, [visible]);

  const showCreateOption = wantsCustomOption && searchTerm?.trim() && !options.find((opt) => opt.label === searchTerm.trim());

  const menu = createPortal(
    <div
      ref={menuRef}
      className={`absolute top-[0] mt-[4px] w-[200px] bg-backgroundC box-content border rounded-md overflow-hidden shadow-md z-[10000] transition-all duration-150 ease-in-out overflow-y-auto customScroll ${
        visible ? 'max-h-[150px] border' : 'max-h-0 border-none'
      }`}
      style={{ top: position.top, left: position.left, width: position?.width }}
    >
      {showCreateOption && (
        <div className="px-3 py-2 text-sm text-blue-600 cursor-pointer hover:bg-blue-50 flex items-center gap-2" onClick={handleCustomOptionSelect}>
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
    </div>,
    document.body
  );

  return (
    <div className={`flex w-max min-w-[200px] ${className}`}>
      <FormInput
        error={error}
        value={searchTerm}
        readOnly={!wantsCustomOption}
        onClick={toggleDropdown}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setVisible(true);
        }}
        placeholder={placeholder}
        // className={}
        label={label}
        size={size}
        layout={layout}
        required={required}
        variant={variant}
        ref={buttonRef}
        suffix={
          <span className={`text-[20px] px-2 transition-all ${!visible ? 'rotate-180' : 'rotate-0'}`}>
            <IoMdArrowDropup />
          </span>
        }
      />
      {menu}
    </div>
  );
};

export default DropDown;
