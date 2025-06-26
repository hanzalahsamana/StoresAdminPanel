"use client";

import { toast } from "react-toastify";

export default function ToggleSwitch({ label = "", checked = false, setChecked = () => { }, isDisabled = false, message = "", className = "" }) {

    const handleToggle = (e) => {
        if (isDisabled) {
            setChecked(false);
            toast.error(message)
            return;
        }

        const newState = e.target.checked;
        setChecked(newState);
    };



    return (
        <div className={`flex justify-between items-center flex-row  gap-2 ${className}`}>
            <p className="text-textTC text-[15px]">{label}</p>
            <label className="relative inline-block w-10 h-5 cursor-pointer">

                {/* Hidden checkbox */}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleToggle}
                    className="hidden"
                />

                {/* Background */}
                <div
                    className={`absolute top-0 left-0 w-full h-full rounded-full transition-colors duration-300 ${checked
                        ? "bg-primaryC bg-opacity-95 shadow-inner shadow-primaryC"
                        : "bg-gray-300 shadow-inner"
                        }`}
                ></div>

                {/* Handle */}
                <div
                    className={`absolute top-[2px] w-4 h-4 rounded-full bg-backgroundC shadow-sm transition-transform duration-300 ${checked
                        ? "translate-x-[22px]  ring-2 ring-primaryC"
                        : "left-[2px]"
                        }`}
                    style={{ left: checked ? undefined : "2px" }}
                ></div>
            </label>
        </div>

    );
}
