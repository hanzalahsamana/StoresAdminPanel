"use client";

import React, { useEffect, useState } from "react";
import FormInput from "../Forms/FormInput";
import MultiImageUploader from "../Uploaders/MultiImageUploader";
import Form from "../Forms/Form";
import Modal from "./Modal";
import MultiSelectDropdown from "../Actions/MultiSelectDropdown";
import DropDown from "../Actions/DropDown";
import { toast } from "react-toastify";
import { addProducts } from "@/APIs/Product/addProductData";
import { editProductData } from "@/APIs/Product/editProductData";
import { setProductLoading } from "@/Redux/Product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscountedPrice } from "@/Utils/CalculateDiscountedPrice";
import { uploadImagesToS3 } from "@/APIs/uploadImageS3";
import { productUploadValidate } from "@/Utils/FormsValidator";

const AddEditProductModal = ({
  isOpen,
  setIsOpen,
  productLoading,
  updatedData = null,
  setUpdatedProduct,
}) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { currUser } = useSelector((state) => state.currentUser);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (updatedData) {
      setFormData({
        ...updatedData,
        discountedPrice: calculateDiscountedPrice(updatedData.originalPrice, updatedData.discount),
      });
    } else {
      setFormData({
        name: "",
        brand: currUser?.brandName || "",
        originalPrice: 100,
        discount: 20,
        discountedPrice: calculateDiscountedPrice(100, 20),
        collectionName: "",
        type: "t-shirt",
        size: [],
        description: "",
        stock: 10,
        images: [],
      });
    }
  }, [updatedData]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setUpdatedProduct(null);
        setFormData({});
      }, 0);
    }
  }, [isOpen]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productUploadValidate(formData, setErrors)) return;

    try {
      dispatch(setProductLoading(true));

      let imagesToUpload = formData.images.filter((img) => img instanceof File);
      let existingImages = formData.images.filter((img) => typeof img === "string");

      if (imagesToUpload.length > 0) {
        const uploadedImagesUrls = await uploadImagesToS3(currUser?.brandName, imagesToUpload);
        formData.images = [...existingImages, ...uploadedImagesUrls];
      }

      const productData = {
        ...formData,
        alt: formData.name,
        originalPrice: Number(formData.originalPrice),
        discountedPrice: Number(formData.discountedPrice),
        discount: Number(formData.discount),
      };

      if (!updatedData) {
        await addProducts(productData, currUser?.brandName, dispatch);
      } else {
        await editProductData(productData, currUser?.brandName, updatedData._id, dispatch);
      }

      dispatch(setProductLoading(false));
      setIsOpen(false);
    } catch (error) {
      dispatch(setProductLoading(false));
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form handleSubmit={handleSubmit} buttonLabel={updatedData ? "Edit Product" : "Add Product"} loading={productLoading}>
        <div className="flex gap-4">
          <FormInput name="name" placeholder="Name" value={formData.name || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.name} />
          <FormInput name="brand" placeholder="Brand Name" value={formData.brand || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.brand} />
        </div>

        <div className="flex gap-4">
          <FormInput type="number" name="originalPrice" placeholder="Original Price" value={formData.originalPrice || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.originalPrice} />
          <FormInput type="number" name="discount" placeholder="Discount %" value={formData.discount || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.discount} />
          <FormInput type="number" name="discountedPrice" placeholder="Discounted Price" value={calculateDiscountedPrice(formData.originalPrice, formData.discount)} readOnly />
        </div>

        <div className="flex gap-4">
          <FormInput name="type" placeholder="Type" value={formData.type || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.type} />
          <FormInput type="number" name="stock" placeholder="Stock" value={formData.stock || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.stock} />
        </div>

        <FormInput name="description" placeholder="Description" value={formData.description || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.description} />

        <div className="flex gap-4">
          <MultiSelectDropdown defaultOptions={["L", "S", "M", "XL"]} selectedOptions={formData.size || []} setSelectedOptions={(options) => handleChange("size", options)} placeholder="Select Sizes" error={errors.size} />
          <DropDown defaultOptions={categories?.map((cat) => cat?.link)} selectedOption={formData.collectionName || ""} setSelectedOption={(option) => handleChange("collectionName", option)} placeholder="Select Category" error={errors.collectionName} />
        </div>

        <MultiImageUploader images={formData.images || []} setImages={(images) => handleChange("images", images)} error={errors.image} />
      </Form>
    </Modal>
  );
};

export default AddEditProductModal;
