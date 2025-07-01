import { useState } from "react";

const Checkbox = ({ label = "Checkbox", isChecked = false, setIsCheck, className }) => {
    const [checked, setChecked] = useState(isChecked);

    const toggleCheck = () => {
        console.log(`Checkbox toggled: ${!checked}`);
        
        setChecked(!checked);
        if (setIsCheck) setIsCheck(!checked);
    };

    return (
        <div className={`relative flex items-center cursor-pointer group ${className}`} onClick={toggleCheck}>
            <input
                type="checkbox"
                checked={checked}
                onChange={() => { }}
                className="absolute opacity-0 w-0 h-0"
            />
            <div
                className={`w-[16px] h-[16px] border rounded-sm flex items-center justify-center transition-all duration-200 
        ${checked ? "bg-primaryC border-primaryC" : "border-gray-400"}`}
            >
                {checked && (
                    <svg
                        className="w-2 h-2 text-backgroundC"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 12 10"
                    >
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                )}
            </div>
            <span className={`ml-1 text-[14px] group-hover:opacity-80 ${checked?'text-primaryC':'text-gray-500'} transition-colors duration-200`}>
                {label}
            </span>
        </div>
    );
};

export default Checkbox;
