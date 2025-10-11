import React from "react";
import { BsCheckCircle, BsDot } from "react-icons/bs";
import clsx from "clsx";
import { GoDot, GoDotFill } from "react-icons/go";

const PaymentMethodSelector = ({
    paymentMethods,
    selectedMethod,
    setSelectedMethod,
}) => {

    return (
        <div className=" mt-3">
            {paymentMethods?.map((method, index) => (
                <div
                    key={method?._id}
                    onClick={() => setSelectedMethod(method)}
                    className={clsx(
                        "flex items-start flex-col gap-4 justify-between w-full px-4 py-3 border cursor-pointer transition-all duration-150",
                        {
                            "border-[var(--tmp-sec)] bg-[var(--tmp-acc)]": selectedMethod?._id === method?._id,
                            "border-gray-300 bg-transparent hover:bg-gray-50": selectedMethod?._id !== method?._id,
                            "rounded-t-md": index === 0,
                            "rounded-b-md": index === paymentMethods?.length - 1,
                        }
                    )}>
                    <div className="flex items-center gap-3">
                        <div className={clsx("w-5 h-5 flex items-center justify-center border rounded-full transition-all duration-150",
                            selectedMethod?._id === method?._id ? "border-black bg-black" : "border-gray-400 bg-white"
                        )}>
                            {selectedMethod?._id === method?._id && (
                                <GoDotFill size={18} className="text-white" />
                            )}
                        </div>
                        <p className="font-medium text-[15px] text-gray-900">
                            {method?.method}
                        </p>
                    </div>
                    {selectedMethod?._id === method?._id &&
                        method?.method === "account" && (
                            <div className=" w-full">
                                <div className="flex justify-between w-full text-[15px]">
                                    <div className="flex flex-col gap-2 text-gray-700 font-medium">
                                        <p>Account Title:</p>
                                        <p>Account Number:</p>
                                        <p>Bank Name:</p>
                                        <p>IBAN:</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 text-gray-600">
                                        <p>{method?.credentials?.Account_Name}</p>
                                        <p>{method?.credentials?.Account_No}</p>
                                        <p>{method?.credentials?.Bank_Name}</p>
                                        <p>{method?.credentials?.IBAN}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            ))
            }
        </div >
    );
};

export default PaymentMethodSelector;
