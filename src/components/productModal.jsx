"use client";

import React, { useEffect, useState } from "react";
import FormInput from "./Forms/FormInput";
import MultiImageUploader from "./Uploaders/MultiImageUploader";
import Form from "./Forms/Form";
import Modal from "./Modals/Modal";
import MultiSelectDropdown from "./Actions/MultiSelectDropdown";
import DropDown from "./Actions/DropDown";
import { toast } from "react-toastify";
import { addProducts } from "@/APIs/Product/addProductData";
import { editProductData } from "@/APIs/Product/editProductData";
import { setProductLoading } from "@/Redux/Product/ProductSlice";
import { productUploadValidate } from "@/Utils/ProductUploadValidate";
import { uploadImagesToCloudinary } from "@/Utils/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscountedPrice } from "@/Utils/CalculateDiscountedPrice";

const Add_Edit_Product = ({
  isOpen,
  setIsOpen,
  productLoading,
  updatedData = null,
  setUpdatedProduct,
}) => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const { currUser } = useSelector((state) => state.currentUser);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    brand: currUser?.brandName,
    originalPrice: 100,
    discount: 20,
    discountedPrice: calculateDiscountedPrice(100, 20),
    collectionName: "",
    type: "t-shirt",
    size: selectedSizes,
    description: "",
    stock: 10,
    ...updatedData,
  });

  console.log(updatedData , "okay2");
  

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      discountedPrice: calculateDiscountedPrice(prev.originalPrice, prev.discount),
      collectionName: selectedCategory,
      size: selectedSizes
    }));
  }, [formData.originalPrice, formData.discount , selectedCategory , selectedSizes]);


  useEffect(() => {
    setSelectedImages(updatedData ? updatedData?.images : []);
    const test = !Array.isArray(updatedData?.size)
      ? updatedData?.size
        ? [updatedData.size]
        : []
      : updatedData.size;
    setSelectedSizes(test);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...updatedData,
      size: test,
    }));
  }, [updatedData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (isOpen === false) {
      setUpdatedProduct(null)
    }
  }, [isOpen])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productUploadValidate(formData , setErrors , selectedImages)) {

      return;
    }

    try {
      dispatch(setProductLoading(true));
      const imageUrls = await uploadImagesToCloudinary(selectedImages);
      if (!updatedData) {
        await addProducts(
          {
            ...formData,
            alt: formData.name,
            originalPrice: Number(formData.originalPrice),
            discountedPrice: Number(formData.discountedPrice),
            discount: Number(formData.discount),
            images: imageUrls,
            size: selectedSizes,
          },
          currUser?.brandName,
          dispatch
        );
      } else {
        await editProductData(
          {
            ...formData,
            alt: formData.name,
            originalPrice: Number(formData.originalPrice),
            discountedPrice: Number(formData.discountedPrice),
            discount: Number(formData.discount),
            images: imageUrls,
            size: selectedSizes,
          },
          currUser?.brandName,
          updatedData._id,
          dispatch
        );
      }
      dispatch(setProductLoading(false));
      setIsOpen(false);
    } catch (error) {
      dispatch(setProductLoading(false));
      toast.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        encType="multipart/formdata"
        handleSubmit={handleSubmit}
        buttonLabel={!updatedData ? "Add Product" : "Edit Product"}
        loading={productLoading}
        lable={!updatedData ? "Add Product" : "Edit Product"}
        className="shadow-none"
      >

        <div className="flex gap-4">
          <FormInput
            placeholder="Name"
            handleChange={handleChange}
            name={"name"}
            value={formData.name}
            error={errors.name}
          />

          <FormInput
            placeholder="Brand Name"
            handleChange={handleChange}
            name={"brand"}
            value={formData.brand}
            error={errors.brand}
          />
        </div>

        <div className="flex gap-4">
          <FormInput
            type="number"
            placeholder="Original Price"
            handleChange={handleChange}
            name={"originalPrice"}
            value={formData.originalPrice}
            error={errors.originalPrice}
          />

          <FormInput
            type="number"
            placeholder="Discount %"
            handleChange={handleChange}
            name={"discount"}
            value={formData.discount}
            error={errors.discount}
            required={false}
          />

          <FormInput
            type="number"
            placeholder="Discounted Price"
            name={"discountedPrice"}
            value={formData.discountedPrice}
            error={errors.discountedPrice}
            readOnly={true}
          />
        </div>

        <div className="flex gap-4">
          <FormInput
            type="text"
            placeholder="Type"
            handleChange={handleChange}
            name={"type"}
            value={formData.type}
            error={errors.type}
          />

          <FormInput
            type="number"
            placeholder="Stock"
            handleChange={handleChange}
            name={"stock"}
            value={formData.stock}
            error={errors.stock}
          />
        </div>

        <div className="flex gap-4">
          <FormInput
            placeholder="Discription"
            handleChange={handleChange}
            name={"discription"}
            value={formData.discription}
            error={errors.discription}
            required={false}
          />
        </div>

        <div className="flex gap-4">
          <MultiSelectDropdown
            defaultOptions={["L", "S", "M", "XL"]}
            selectedOptions={selectedSizes}
            setSelectedOptions={setSelectedSizes}
            wantsMultipleSelect={true}
            wantsCustomOption={true}
            placeholder="Select Sizes"
            error={errors.size}
          />

          <DropDown
            defaultOptions={categories?.map((cat) => cat?.link)}
            selectedOption={selectedCategory}
            setSelectedOption={setSelectedCategory}
            placeholder="Select Category"
            error={errors.collectionName}
          />
        </div>

        <MultiImageUploader images={selectedImages} setImages={setSelectedImages} error={errors.image} />

      </Form>
    </Modal>
  );
};

export default Add_Edit_Product;
