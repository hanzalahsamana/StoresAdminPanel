"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "@/components/Forms/FormInput";
import { toast } from "react-toastify";
import { addCategory } from "@/APIs/Category/addCategory";
import { editCategory } from "@/APIs/Category/editCategory";
import ImageUploader from "../Uploaders/ImageUploader";
import Form from "../Forms/Form";
import Modal from "./Modal";
import { uploadSingleImageToS3 } from "@/APIs/uploadImageS3";

const CategoryAddModal = ({
    isOpen,
    setIsOpen,
    updatedData = null,
}) => {
    const { currUser } = useSelector((state) => state.currentUser);
    const [errors, setErrors] = useState({});
    const [loading, setloading] = useState(false);
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
            setloading(true);
              if (formData?.image && formData?.image instanceof File) {
                    const uploadedImageUrl = await uploadSingleImageToS3(currUser?.brandName, formData.image);
                    formData.image = uploadedImageUrl;
                  }
            if (!updatedData) {
                await addCategory(
                    {
                        ...formData,
                        link: convertToSlug(formData.name),
                    },
                    currUser?.brandName,
                    dispatch
                );
            } else {
                await editCategory(
                    {
                        ...formData,
                        link: convertToSlug(formData.name),
                    },
                    currUser?.brandName,
                    updatedData._id,
                    dispatch
                );
            }
            setFormData(initialFormData)
            setloading(false)
            setIsOpen(false);
        } catch (error) {
            setloading(false)
            toast.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <Form
                buttonLabel={!updatedData ? "Add Category" : "Update Category"}
                handleSubmit={handleSubmit}
                label={"Add Category"}
                encType="multipart/formdata"
                loading={loading}
            >
                <FormInput
                    placeholder="Name"
                    handleChange={handleChange}
                    name={"name"}
                    value={formData?.name}
                    error={errors?.name}
                />

                <ImageUploader
                    key={"image"}
                    image={formData["image"]}
                    setImage={(image) => setFormData((prev) => ({ ...prev, image }))}
                />
            </Form>
        </Modal>
    );
};

export default CategoryAddModal;
