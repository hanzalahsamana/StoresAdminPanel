"use client";

import { useState } from "react";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import ActionCard from "@/components/Cards/ActionCard";
import FormInput from "@/components/Forms/FormInput";
import DropDown from "@/components/Actions/DropDown";
import Button from "@/components/Actions/Button";
import Modal from "@/components/Modals/Modal";
import { toast } from "react-toastify";
import RadioButton from "@/components/Actions/RadioButton";
import { generateSlug } from "@/Utils/GenerateSlug";
import { Base_Domain } from "config";

const StoreDetails = ({ isOpen, onClose, onComplete }) => {
    const [formData, setFormData] = useState({
        brandName: "",
        categories: "",
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
        <BackgroundFrame>
            <Modal isOpen={true} onClose={onClose}>
                <ActionCard
                    lable="Generate Your Store"
                    subText="Please provide your store details to proceed."
                    actions={<>
                        <Button
                            label="Continue"
                            onClick={handleSaveChanges}
                            loading={loading}
                            size="small"
                        />
                    </>}
                    actionPosition="top"
                >

                    <FormInput
                        name="brandName"
                        value={formData.brandName}
                        handleChange={(e) => handleChange("brandName", e.target.value)}
                        label="Brand Name"
                        error={errors.brandName}
                        placeholder="Enter your brand name"
                        layout="label"
                    />

                    {formData.brandName && (
                        <p className="text-[10px] mt-1 text-textTC">
                            Your store subdomain will be{" "}
                            <span className="text-primaryC">
                                {generateSlug(formData.brandName)}.{Base_Domain}
                            </span>
                        </p>
                    )}

                    <DropDown
                        defaultOptions={[
                            "Apparel",
                            "Perfume",
                            "Electronics",
                            "Health & Beauty",
                            "Home Decor",
                            "Food & Grocery",
                            "Toys & Games",
                            "Baby Products",
                            "Furniture",
                            "Arts & Crafts",
                            "Mobile Accessories",
                            "Watches & Accessories",
                        ]
                        }
                        selectedOption={formData.categories}
                        setSelectedOption={(val) => handleChange("categories", val)}
                        label="Select Your Store Type"
                        wantsCustomOption={true}
                        layout={"label"}
                        placeholder="eg: clothing store"
                    />
                    <RadioButton
                        label="Where did you hear about us?"
                        options={[
                            { label: "Friends", value: "friends" },
                            { label: "Advertisement", value: "ads" },
                            { label: "From Influencer", value: "influencer" },
                            { label: "Social Media (YouTube, Instagram, etc.)", value: "social_media" },
                            { label: "Email Newsletter", value: "email_newsletter" },
                        ]}
                    />
                </ActionCard>
            </Modal>
        </BackgroundFrame>
    );
};

export default StoreDetails;