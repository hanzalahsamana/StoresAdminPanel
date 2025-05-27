import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";

const FormStepper = ({ limit, currentStep, className }) => {
    return (
        <div className={`flex items-center w-full justify-between h-[34px] ${className}`}>
            {Array.from({ length: limit }).map((_, index) => {
                const step = index + 1;
                const isActive = step <= currentStep;
                const isCurrent = step === currentStep;

                return (
                    <div className=" flex relative items-center justify-center" style={{
                        width: `calc(100%/${limit})`,
                    }}>
                        <div
                            className={`absolute w-8 h-8  flex items-center justify-center rounded-full font-semibold  text-white z-10 transition-all duration-300 ${isActive ? "bg-blue-600" : "bg-gray-300"
                                } ${isCurrent ? "ring-4 ring-blue-300" : ""}`}>
                            {step < currentStep ? <HiCheck /> : step}
                        </div>

                        <div
                            className={`relative flex-1 h-1 bg-gray-300 overflow-hidden 
                                ${index === 0 && "rounded-tl-full rounded-bl-full"} 
                                ${index === limit - 1 && "rounded-tr-full rounded-br-full"}`}
                        >
                            <div
                                className="absolute h-full bg-blue-600 transition-all duration-500"
                                style={{
                                    width: currentStep >= step ? "100%" : "0%",
                                    left: "0%",
                                }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FormStepper;
