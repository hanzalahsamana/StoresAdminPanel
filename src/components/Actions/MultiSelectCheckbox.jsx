import React from "react";

const MultiSelectCheckbox = ({ lable = "", options, selectedOptions, setSelectedOptions }) => {
    const handleToggle = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleToggleAll = () => {
        if (selectedOptions.length === options.length) {
            // Uncheck all
            setSelectedOptions([]);
        } else {
            // Check all
            setSelectedOptions([...options]);
        }
    };

    const isAllSelected = selectedOptions.length === options.length;

    const renderCheckbox = (label, isSelected, onChange) => (
        <label className="flex items-center space-x-3 w-max cursor-pointer">
            <div
                className={`w-4 h-4 rounded-[2px] transition-all  flex items-center justify-center ${isSelected ? "bg-primaryC" : "bg-backgroundC border border-borderC"
                    }`}
            >
                {isSelected && (
                    <svg
                        className="w-[18px] h-[18px] text-backgroundC"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className="text-gray-800 text-[14px]">{label}</span>
            <input type="checkbox" checked={isSelected} onChange={onChange} className="hidden" />
        </label>
    );

    return (
        <div className="">
            <p className="text-textC font-medium text-lg mb-3">{lable}</p>

            <div className="space-y-3 ml-[10px]">
                {renderCheckbox("All", isAllSelected, handleToggleAll)}

                {options.map((option) => {
                    const isSelected = selectedOptions.includes(option);
                    return (
                        <div key={option}>
                            {renderCheckbox(option, isSelected, () => handleToggle(option))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultiSelectCheckbox;
