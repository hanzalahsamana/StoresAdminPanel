import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Forms/FormInput";
import ToggleSwitch from "../Actions/ToggleSwitch";
import Button from "../Actions/Button";
import DropDown from "../Actions/DropDown";
import { RiDiscountPercentLine } from "react-icons/ri";
import Modal from "./Modal";
import ActionCard from "../Cards/ActionCard";
import { addDiscount, editDiscount } from "@/APIs/StoreDetails/discount";
import { toast } from "react-toastify";

const initialForm = {
    name: "",
    discountType: "coupon",
    access: "all",
    amountType: "fixed",
    amount: "",
    isActive: true,
    expiryDate: new Date().toISOString().slice(0, 16),// Set default to current date and time
};

const AddEditDiscountModal = ({ isOpen, setIsOpen, updatedDiscount = null, setUpdatedDiscount }) => {
    const dispatch = useDispatch();
    const { currUser } = useSelector((state) => state.currentUser);

    const [form, setForm] = useState(initialForm);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (updatedDiscount) {
            setForm({
                name: updatedDiscount.name || "",
                discountType: updatedDiscount.discountType || "coupon",
                access: updatedDiscount.access || "all",
                amountType: updatedDiscount.amountType || "fixed",
                amount: String(updatedDiscount.amount || ""),
                isActive: updatedDiscount.isActive ?? true,
                expiryDate: updatedDiscount?.expiryDate
                    ? formatDateTimeLocal(updatedDiscount.expiryDate)
                    : formatDateTimeLocal(new Date()),

            });
            setErrors({});
        } else {
            setForm(initialForm);
            setErrors({});
        }
    }, [updatedDiscount, isOpen]);


    const functionBeforeClose = () => {
        setUpdatedDiscount(null);
        setForm(initialForm);
        setErrors({});
    }

    const formatDateTimeLocal = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // convert to local
        return d.toISOString().slice(0, 16); // format: yyyy-MM-ddTHH:mm
    };

    const handleChange = (key, value) => {
        if (key === "name") {
            value = value.toUpperCase();
        }
        if (key === "amount") {
            if (Number(value) < 0) return;
        }
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name) errs.name = "Discount name is required";
        if (!form.amount) {
            errs.amount = "Amount is required";
        } else {
            const amount = Number(form.amount);
            if (amount <= 0) errs.amount = "Amount must be positive";
            if (form.amountType === "percent" && amount > 100)
                errs.amount = "Percentage cannot exceed 100";
        }
        if (!form.expiryDate) {
            errs.expiryDate = "Expiry date is required";
        } else {
            const expiry = new Date(form.expiryDate);
            const now = new Date();
            if (expiry <= now) {
                errs.expiryDate = "Expiry date must be in the future";
            }
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        const data = {
            ...form,
            amount: Number(form.amount),
            expiryDate: new Date(form.expiryDate).toISOString(),
        };

        try {
            setLoading(true);
            if (updatedDiscount) {
                await editDiscount(updatedDiscount._id, data, currUser?.token, dispatch);
                toast.success("Discount updated successfully!");
            } else {
                await addDiscount(data, currUser?.token, dispatch);
                toast.success("Discount added successfully!");
            }
            functionBeforeClose();
            setIsOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.error || "Operation failed");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} extraFuntion={functionBeforeClose}>
            <ActionCard
                lable={updatedDiscount ? "Edit Discount" : "Add Discount"}
                icon={<RiDiscountPercentLine size={24} />}
                actionPosition="top"
                actions={
                    <Button
                        className="mr-[20px]"
                        size="small"
                        action={handleSave}
                        label={updatedDiscount ? "Update Discount" : "Save Discount"}
                        loading={loading}
                    />
                }
            >
                <div className="grid grid-cols-2 mt-[20px] gap-4 w-full">
                    <FormInput
                        layout="label"
                        label="Name / Code"
                        placeholder="e.g. NEWYEAR2025"
                        value={form.name}
                        handleChange={(e) => handleChange("name", e.target.value)}
                        error={errors.name}
                    />

                    <DropDown
                        layout="label"
                        label="Discount Type"
                        defaultOptions={["coupon", "global"]}
                        selectedOption={form.discountType}
                        setSelectedOption={(value) => handleChange("discountType", value)}

                    />

                    <DropDown
                        layout="label"
                        label="Access"
                        defaultOptions={["all", "subscription"]}
                        selectedOption={form.access}
                        setSelectedOption={(value) => handleChange("access", value)}
                    />

                    <DropDown
                        layout="label"
                        label="Amount Type"
                        defaultOptions={["fixed", "percent"]}
                        selectedOption={form.amountType}
                        setSelectedOption={(value) => handleChange("amountType", value)}
                    />

                    <FormInput
                        layout="label"
                        label={form.amountType === "fixed" ? "Amount (RS)" : "Amount (%)"}
                        type="number"
                        value={form.amount}
                        handleChange={(e) => handleChange("amount", e.target.value)}
                        error={errors.amount}
                        placeholder="Enter amount"
                    />

                    <FormInput
                        layout="label"
                        type="datetime-local"
                        label="Expiry Date"
                        value={form.expiryDate}
                        handleChange={(e) => handleChange("expiryDate", e.target.value)}
                        error={errors.expiryDate}
                        placeholder="Select expiry date"
                    />

                    <ToggleSwitch
                        label={form.isActive ? "Discount Active" : "Discount InActive"}
                        defaultChecked={form.isActive}
                        onChange={(val) => handleChange("isActive", val)}
                        className="mt-[20px]"
                    />
                </div>
            </ActionCard>
        </Modal>
    );
};

export default AddEditDiscountModal;
