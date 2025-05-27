import React from "react";

const MultiSelectCheckbox = ({
  lable = "",
  options,
  selectedOptions,
  setSelectedOptions,
  className = "",
}) => {
  const isObjectOption = typeof options?.[0] === "object";

  const getOptionValue = (option) =>
    isObjectOption ? option.value : option;

  const getOptionLabel = (option) =>
    isObjectOption ? option.label : option;

  const handleToggle = (option) => {
    const value = getOptionValue(option);
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleToggleAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options.map((opt) => getOptionValue(opt)));
    }
  };

  const isAllSelected =
    selectedOptions.length === options.length &&
    options.every((opt) =>
      selectedOptions.includes(getOptionValue(opt))
    );

  const renderCheckbox = (label, isSelected, onChange) => (
    <label className="flex items-center space-x-3 w-max cursor-pointer">
      <div
        className={`w-4 h-4 rounded-[2px] transition-all flex items-center justify-center ${isSelected
            ? "bg-primaryC"
            : "bg-backgroundC border border-borderC"
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
    <div>
      <p className="text-textC font-medium text-lg mb-3">{lable}</p>
      <div className={`space-y-3 ml-[10px] ${className}`}>
        {renderCheckbox("All", isAllSelected, handleToggleAll)}
        {options.map((option, index) => {
          const value = getOptionValue(option);
          const label = getOptionLabel(option);
          const isSelected = selectedOptions.includes(value);
          return (
            <div key={index}>
              {renderCheckbox(label, isSelected, () => handleToggle(option))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelectCheckbox;
