import React from "react";

const RadioButton = ({ label = "", options, selectedOption, setSelectedOption }) => {
    const renderRadio = (option, isSelected, onChange) => (
        <label className="flex items-center space-x-3 w-max cursor-pointer">
            <div
                className={`w-4 h-4 rounded-full transition-all border border-borderC flex items-center justify-center ${isSelected ? "bg-primaryC" : "bg-backgroundC"}`}
            >
                {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-backgroundC" />
                )}
            </div>
            <span className="text-gray-800 font-medium text-[14px]">{option}</span>
            <input type="radio" checked={isSelected} onChange={onChange} className="hidden" />
        </label>
    );

    return (
        <div>
            <p className="text-textC  font-medium  text-lg mb-3">{label}</p>
            <div className="space-y-2 ml-[10px]">
                {options.map((option) => {
                    const isSelected = selectedOption === option;
                    return (
                        <div key={option}>
                            {renderRadio(option, isSelected, () => setSelectedOption(option))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioButton;
