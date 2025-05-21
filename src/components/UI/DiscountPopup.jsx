import { useEffect, useState } from "react";
import FormInput from "../Forms/FormInput";
import Modal from "../Modals/Modal";

const DiscountPopup = ({ discount, isOpen, setIsOpen }) => {
    const [email, setEmail] = useState("");

    // Guard clause: check for open, discount presence, active status, and expiry
    const isValidDiscount =
        isOpen &&
        discount &&
        discount.isActive &&
        new Date(discount.expiryDate) > new Date();

    if (!isValidDiscount) return null;

    const isPercent = discount.amountType === "percent";
    const isCoupon = discount.discountType === "coupon";
    const isSubscriptionOnly = discount.access === "subscription";

    const handleSubscribe = () => {
        console.log("Subscribed Email:", email);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} position="static" className={'!max-w-[500px]'}>
            <div className="p-6 w-full flex flex-col items-center relative">
                
                <p className="text-[22px] text-textC font-medium mb-8 text-center">
                    Special Discount!
                </p>

                <p className="italic text-[14px]">WE'RE Giving You</p>

                <p className="text-[60px] font-[serif]">
                    {isPercent
                        ? `${discount.amount}% OFF`
                        : `Rs ${discount.amount} OFF`}
                </p>

                <div className="w-[150px] border-red-600 border-t-2 mb-4" />

                {isCoupon && (
                    <p className="mb-2 text-center text-[16px]">
                        Use code:{" "}
                        <strong className="text-red-600">{discount.name}</strong>
                    </p>
                )}

                {isSubscriptionOnly ? (
                    <div className="w-full mt-4">
                        <FormInput
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <button
                            onClick={handleSubscribe}
                            className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-2 py-2 rounded"
                        >
                            Subscribe
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                        >
                            Got it!
                        </button>
                    </div>
                )}


            </div>
        </Modal>

    );
};

export default DiscountPopup;
