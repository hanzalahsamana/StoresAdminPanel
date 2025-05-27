"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { useState } from "react";
import Button from "@/components/Actions/Button";
import MultiSelectDropdown from "@/components/Actions/MultiSelectDropdown";
import FormInput from "@/components/Forms/FormInput";
import Modal from "@/components/Modals/Modal";
import { toast } from "react-toastify";
import MultiSelectCheckbox from "@/components/Actions/MultiSelectCheckbox";
import RadioButton from "@/components/Actions/RadioButton";

const StoreDetails = ({ isOpen, onClose, onComplete }) => {
    const [formData, setFormData] = useState({
        brandName: "",
        categories: [],
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.brandName.trim()) errs.brandName = "Brand name is required";
        if (formData.categories.length === 0) errs.categories = "Select at least one category";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSaveChanges = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            // Send to API (replace with your real endpoint)
            // await axios.post("/api/onboarding", formData);

            toast.success("Store details saved!");
            onComplete?.(); // proceed to dashboard or next step
        } catch (error) {
            toast.error("Failed to save store details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="space-y-6 p-4">
                <h2 className="text-xl font-semibold text-center">Setup Your Store</h2>

                <FormInput
                    name="brandName"
                    value={formData.brandName}
                    handleChange={(e) => handleChange("brandName", e.target.value)}
                    placeholder="Brand Name"
                    error={errors.brandName}
                    // size="small"
                    // layout="label"
                />
                {/* 
                <MultiSelectDropdown
                    name="categories"
                    placeholder="Select Categories"
                   
                    setSelectedOptions={(val) => handleChange("categories", val)}
                    selectedOptions={formData.categories}
                    defaultOptions={[
                        "Business",
                        "Apparel",
                        "Perfume",
                        "Electronics",
                        "Health & Beauty",
                        "Home Decor",
                        "Food & Grocery",
                    ]}
                /> */}

                <RadioButton
                    options={[
                        { label: "Apparel", value: "apparel" },
                        { label: "Perfume", value: "perfume" },
                        { label: "Electronics", value: "electronics" },
                        { label: "Health & Beauty", value: "health_beauty" },
                        { label: "Home Decor", value: "home_decor" },
                        { label: "Food & Grocery", value: "food_grocery" },
                        { label: "Toys & Games", value: "toys_games" },
                        { label: "Baby Products", value: "baby_products" },
                        { label: "Furniture", value: "furniture" },
                        { label: "Arts & Crafts", value: "arts_crafts" },
                        { label: "Mobile Accessories", value: "mobile_accessories" },
                        { label: "Watches & Accessories", value: "watches_accessories" }
                    ]
                    }
                    selectedOption={formData.categories}
                    setSelectedOption={(val) => handleChange("categories", val)}
                    label="Select Your Store Type"
                    className="grid grid-cols-2 !gap-4 space-y-0"
                />

                <Button
                    label="Save Changes"
                    onClick={handleSaveChanges}
                    loading={loading}
                />
            </div>
        </Modal>
    );
};

export default ProtectedRoute(StoreDetails);