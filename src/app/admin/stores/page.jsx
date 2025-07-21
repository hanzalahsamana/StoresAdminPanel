"use client";

import { useState } from "react";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import ActionCard from "@/components/Cards/ActionCard";
import FormInput from "@/components/Forms/FormInput";
import DropDown from "@/components/Actions/DropDown";
import Button from "@/components/Actions/Button";
import Modal from "@/components/Modals/Modal";
import { toast } from "react-toastify";
import { generateSlug } from "@/Utils/GenerateSlug";
import { Base_Domain } from "config";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HTTP } from "config";
import { FiArrowUpRight } from "react-icons/fi";
import { generateStore } from "@/APIs/StoreDetails/generateStore";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/Loader/loader";

const StoreDetails = ({ onClose, onComplete }) => {
    const { allStores, allStoresLoading } = useSelector((state) => state.allStores);
    const { currUser } = useSelector((state) => state.currentUser);

    const [formData, setFormData] = useState({
        storeName: "",
        storeType: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.storeName.trim()) errs.storeName = "Brand name is required";
        if (!formData.storeType || typeof formData.storeType !== "string") errs.storeType = "Select a store type";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSaveChanges = async () => {
        if (!validate()) return;
        setLoading(true);
        const payload = {
            storeName: formData.storeName,
            storeType: formData.storeType,
        };
        await generateStore(currUser?.token, payload);
        setShowModal(false);
        setFormData({ storeName: "", storeType: "" }); // Reset form
        onComplete?.();
        setLoading(false);
    };

    if (allStoresLoading) {
        return <Loader />;
    }

    return (
        <BackgroundFrame>
            <ActionCard
                label="Your Stores"
                subText="Select a store to proceed or create a new one."
                className="p-[30px]"
                actions={
                    <Button
                        label="Generate Another"
                        action={() => setShowModal(true)}
                        size="small"
                        variant=""
                        icon={<FaArrowRightLong />}
                        iconPosition="right"
                        iconOnHover={true}
                    />
                }
                actionPosition="top"
            >
                {allStores.length > 0 &&
                    allStores.map((store, index) => (
                        <Link
                            key={index}
                            href={`/admin/${store?._id}`}
                            className="flex items-center gap-3 p-4 rounded-md hover:bg-gray-100 transition cursor-pointer group"
                        >
                            <div className="text-[30px]">#{index + 1}</div>
                            <div className="flex items-start flex-col">
                                <p className="text-xl font-semibold">{store?.storeName}</p>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-1 items-center text-blue-400 text-sm hover:underline"
                                    href={`${HTTP}${store?.subDomain || store?.storeName}.${Base_Domain}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {store?.subDomain || store?.storeName}.{Base_Domain} <FiArrowUpRight />
                                </a>
                            </div>
                        </Link>
                    ))}
            </ActionCard>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                position="fixed bg-opacity-30"
                className="!max-w-[550px]"
            >
                <ActionCard
                    label="Generate Your Store"
                    subText="Please provide your store details to proceed."
                    className="p-[30px]"
                    actions={
                        <Button
                            label="Generate"
                            action={handleSaveChanges}
                            loading={loading}
                            size="small"
                            variant="black"
                            icon={<FaArrowRightLong />}
                            iconPosition="right"
                            iconOnHover={true}
                        />
                    }
                    actionPosition="top"
                >
                    <FormInput
                        name="storeName"
                        value={formData.storeName}
                        onChange={(e) => handleChange("storeName", e.target.value)}
                        label="Brand Name"
                        error={errors.storeName}
                        placeholder="Enter your brand name"
                        layout="label"
                    />

                    {formData.storeName && (
                        <p className="text-[10px] -mt-4 text-textTC">
                            Your store subdomain will be{" "}
                            <span className="text-primaryC">
                                {generateSlug(formData.storeName)}.{Base_Domain}
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
                        ]}
                        selectedOption={formData.storeType}
                        setSelectedOption={(val) => handleChange("storeType", val)}
                        label="Select Your Store Type"
                        wantsCustomOption={true}
                        layout="label"
                        placeholder="eg: clothing store"
                    />
                </ActionCard>
            </Modal>
        </BackgroundFrame>
    );
};

export default StoreDetails;