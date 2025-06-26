import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Forms/FormInput";
import ToggleSwitch from "../Actions/ToggleSwitch";
import Button from "../Actions/Button";
import { RiDiscountPercentLine } from "react-icons/ri";
import Modal from "./Modal";
import ActionCard from "../Cards/ActionCard";
import { addDiscount, editDiscount } from "@/APIs/StoreDetails/discount";
import { toast } from "react-toastify";
import RadioButton from "../Actions/RadioButton";

const initialForm = {
    name: "",
    discountType: "coupon",
    access: "all",
    amountType: "fixed",
    amount: "",
    isActive: true,
    expiryDate: new Date().toISOString().slice(0, 16),
    minOrderAmount: "",
    usageLimit: "",
    usagePerUser: "",
    headline: "",
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
                minOrderAmount: String(updatedDiscount.minOrderAmount || ""),
                usageLimit: String(updatedDiscount.usageLimit || ""),
                usagePerUser: String(updatedDiscount.usagePerUser || ""),
                headline: updatedDiscount.headline || "",
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
    };

    const formatDateTimeLocal = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    };

    const handleChange = (key, value) => {
        if (key === "name") value = value.toUpperCase();
        if (["amount", "minOrderAmount", "usageLimit", "usagePerUser"].includes(key)) {
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

        if (form.minOrderAmount && Number(form.minOrderAmount) <= 0) {
            errs.minOrderAmount = "Minimum order amount cannot be less than 0";
        }
        if (form.discountType === "coupon") {
            if (form.usageLimit && Number(form.usageLimit) <= 0) {
                errs.usageLimit = "Usage limit cannot be less than 0";
            }
            if (form.usagePerUser && Number(form.usagePerUser) <= 0) {
                errs.usagePerUser = "Usage per user cannot be less than 0";
            }
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        const data = {
            ...form,
            name:form.name,
            amount: Number(form.amount),
            minOrderAmount: Number(form.minOrderAmount || 0),
            expiryDate: new Date(form.expiryDate).toISOString(),
            isActive: form.isActive,
            amountType: form.amountType,
            discountType: form.discountType,
            headline: form.headline,
            access: null,
            usageLimit: null,
            usagePerUser: null,
        };

        if (form.discountType === "coupon") {
            data.access = form.access;
            data.usageLimit = form.usageLimit ? Number(form.usageLimit) : null;
            data.usagePerUser = form.usagePerUser ? Number(form.usagePerUser) : null;
        }

        try {
            console.log(data, "🍔🍔🍔🍔");

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
            toast.error(err?.response?.data?.message || "Operation failed");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} extraFuntion={functionBeforeClose}>
            <ActionCard
                label={updatedDiscount ? "Edit Discount" : "Add Discount"}
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
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="col-span-2 flex justify-around border-t border-b py-[15px] flex-wrap gap-2">
                        <RadioButton
                            options={["coupon", "global"]}
                            label="Discount Type:"
                            selectedOption={form.discountType}
                            setSelectedOption={(value) => handleChange("discountType", value)}
                        />
                        {form.discountType === "coupon" && (
                            <>

                                <RadioButton
                                    options={["all", "subscription"]}
                                    label="Use who can access:"
                                    selectedOption={form.access}
                                    setSelectedOption={(value) => handleChange("access", value)}
                                />
                            </>
                        )}
                        <RadioButton
                            options={["fixed", "percent"]}
                            label="Amount type for discount"
                            selectedOption={form.amountType}
                            setSelectedOption={(value) => handleChange("amountType", value)}
                        />
                    </div>

                    <FormInput
                        layout="label"
                        label="Name / Code"
                        placeholder="e.g. NEWYEAR2025"
                        value={form.name}
                        handleChange={(e) => handleChange("name", e.target.value)}
                        error={errors.name}
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

                    <FormInput
                        layout="label"
                        label="Min Order Amount (RS)"
                        type="number"
                        value={form.minOrderAmount}
                        handleChange={(e) => handleChange("minOrderAmount", e.target.value)}
                        error={errors.minOrderAmount}
                        placeholder="Leave empty for unlimited"
                    />

                    {form.discountType === "coupon" && (
                        <>
                            <FormInput
                                layout="label"
                                label="Total Usage Limit (Optional)"
                                type="number"
                                value={form.usageLimit}
                                handleChange={(e) => handleChange("usageLimit", e.target.value)}
                                error={errors.usageLimit}
                                placeholder="Leave empty for unlimited"
                            />

                            <FormInput
                                layout="label"
                                label="Usage Per User (Optional)"
                                type="number"
                                value={form.usagePerUser}
                                handleChange={(e) => handleChange("usagePerUser", e.target.value)}
                                error={errors.usagePerUser}
                                placeholder="Leave empty for unlimited"
                            />
                        </>
                    )}

                    <FormInput
                        layout="label"
                        label="Headline (Optional)"
                        value={form.headline}
                        handleChange={(e) => handleChange("headline", e.target.value)}
                        placeholder="e.g. 10% off on all orders above 1000 Rs"
                    />

                    <ToggleSwitch
                        label={form.isActive ? "Discount Active" : "Discount InActive"}
                        checked={form.isActive}
                        setChecked={(val) => handleChange("isActive", val)}
                        className="mt-[20px]"
                    />
                </div>
            </ActionCard>
        </Modal>
    );
};

export default AddEditDiscountModal;
