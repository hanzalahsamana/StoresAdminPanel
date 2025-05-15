import { useEffect } from "react";

const DiscountPopup = ({ discount, isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // if (!isOpen || !discount) return null;

    return (
            <div className="bg-white rounded-xl p-6 max-w-md w-full customShadow relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-2 text-center">Special Discount</h2>
                <p className="mb-2 text-center">
                    <strong className="text-red-600">
                        {discount.amountType === "percent"
                            ? `${discount.amount}% OFF`
                            : `$${discount.amount} OFF`}
                    </strong>{" "}
                    using code <strong>{discount.name}</strong>
                </p>
                <p className="text-sm text-center text-gray-600">
                    Expires on: {new Date(discount.expiryDate).toLocaleString()}
                </p>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                        onClick={onClose}
                    >
                        Got it!
                    </button>
                </div>
            </div>
    );
};

export default DiscountPopup;
