"use client";

import React, { useState } from "react";
import { uploadToCloudinary } from "@/Utils/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "@/components/Forms/FormInput";
import { toast } from "react-toastify";
import { setCategoryLoading } from "@/Redux/Category/CategorySlice";
import { addCategory } from "@/APIs/Category/addCategory";
import { editCategory } from "@/APIs/Category/editCategory";
import ImageUploader from "./ImageUploader";
import Loader from "../loader";

const CategoryAddModal = ({
    setIsOpen,
    categoryLoading,
    updatedData = null,
    setUpdatedCategory,
}) => {
    const { currUser } = useSelector((state) => state.currentUser);
    const [errors, setErrors] = useState({});
    const initialFormData = {
        name: '',
        image: "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp",
        link: '',
        ...updatedData
    };
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    function convertToSlug(str) {
        return str
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .trim();
    }


    const validateForm = () => {
        const newErrors = {};
        const { name, image } = formData;

        if (!name) {
            newErrors.name = "Category Name is required"
        } else if (/\//.test(name)) {
            newErrors.name = "Category name should not contain slashes";
        }
        if (!image) newErrors.image = "Category Image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            dispatch(setCategoryLoading(true));
            const imageUrl = await uploadToCloudinary(formData.image);
            if (!updatedData) {
                await addCategory(
                    {
                        ...formData,
                        image: imageUrl,
                        link: convertToSlug(formData.name),
                    },
                    currUser?.brandName,
                    dispatch
                );
            } else {
                await editCategory(
                    {
                        ...formData,
                        image: imageUrl,
                        link: convertToSlug(formData.name),
                    },
                    currUser?.brandName,
                    updatedData._id,
                    dispatch
                );
            }
            dispatch(setCategoryLoading(false));
            setFormData(initialFormData)
            setIsOpen(false);
        } catch (error) {
            dispatch(setCategoryLoading(false));
            toast.error(error);
        }
    };

    return (
        <div className="w-screen bg-[#000000b7] absolute top-0 left-0 h-screen flex justify-center items-center">
            <div className="w-[40%] min-w-[300px] h-[95%] z-50 overflow-y-auto no-scrollbar rounded-lg">
                <div className="w-[100%] min-h-[400px] bg-white shadow-lg p-6 relative rounded-lg">
                    <button
                        onClick={() => {
                            setIsOpen(false), setUpdatedCategory(null);
                        }}
                        className="absolute top-[0px] right-2 text-gray-600 hover:text-gray-800 text-3xl"
                    >
                        &times;
                    </button>

                    <h3 className="text-[28px] font-semibold mb-5 text-center">
                        Add Category
                    </h3>

                    {categoryLoading ? (
                        <Loader />
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                            encType="multipart/formdata"
                        >
                            <div className="flex gap-4">
                                <FormInput
                                    type="text"
                                    placeholder="Name"
                                    handleChange={handleChange}
                                    field={"name"}
                                    errors={errors}
                                    formData={formData}
                                />
                            </div>

                            <ImageUploader
                                key={"image"}
                                image={formData["image"]}
                                setImage={(image) => setFormData((prev) => ({ ...prev, image }))}
                            />

                            <button className="py-4 w-full mt-2 bg-[#407fc4] text-white text-lg font-semibold rounded-md hover:scale-105 transition duration-300">
                                {!updatedData ? "Add Category" : "Update Category"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryAddModal;
