import { useRef, useState, useEffect } from "react";

export default function PillSelector({ label = '', data = [], selectedValue = 'Center', setSelectedValue = () => { }, className = '' }) {
    return (
        <div className={`flex justify-between gap-3 items-center w-full ${className}`}>
            {label && (<p className="text-[14px] font-medium text-nowrap text-textC ">{label}</p>)}

            <div className="grid grid-cols-3 w-full gap-[3px] bg-gray-100 rounded-md p-[3px] border"
                style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
            >
                {data.map((item) => {
                    const isSelected = selectedValue === item.value;
                    return (
                        <button
                            key={item.value}
                            onClick={() => setSelectedValue(item.value)}
                            className={`flex items-center justify-center gap-1 px-2.5 py-[5px] border text-[12px] rounded-md transition-all
                                ${isSelected
                                    ? "bg-white shadow-sm text-primaryC"
                                    : "text-gray-700 hover:bg-white/80 border-transparent"
                                }`}
                        >
                            {item.icon && <span>{item.icon}</span>}
                            {item.label || item.value}
                        </button>
                    );
                })}
            </div>
        </div>

    );
}

