import React, { useState } from "react";
import Modal from "./Modal";
import FormInput from "../Forms/FormInput";
import Button from "../Actions/Button";
import { useRouter } from "next/navigation";

const isValidMongoId = (id) => /^[a-f\d]{24}$/i.test(id); // Checks if ID is a valid MongoDB ObjectId

const OrderTrackModal = ({ isOpen, setIsOpen }) => {
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const value = e.target.value;
        setOrderId(value);
        if (value.startsWith("#")) {
            setError("Order ID should not start with #");
        } else {
            setError("");
        }
    };

    const handleSubmit = () => {
        if (!orderId) {
            setError("Order ID is required");
            return;
        }
        if (orderId.startsWith("#")) {
            setError("Order ID should not start with #");
            return;
        }
        if (!isValidMongoId(orderId)) {
            setError("Invalid Order ID");
            return;
        }

        setLoading(true);
        router.push(`/track/${orderId}`);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={'!max-w-[400px] px-[20px] py-[40px] '}>
            <FormInput
                name="orderId"
                error={error}
                value={orderId}
                placeholder="Enter Order ID"
                handleChange={handleChange}
                type="text"
            />

            <Button action={handleSubmit} loading={loading} type="button" className="mt-[20px] !bg-black" label="Track Order"/>
        </Modal>
    );
};

export default OrderTrackModal;
