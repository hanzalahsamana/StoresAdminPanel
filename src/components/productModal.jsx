"use client";

import React, { useEffect, useState } from "react";
import { addProducts } from "@/APIs/Product/addProductData";
import { uploadImagesToCloudinary } from "@/Utils/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "@/components/FormInput";
import SizeSelector from "@/components/SizesFields";
import Loader from "./loader";
import { setProductLoading } from "@/Redux/Product/ProductSlice";
import { toast } from "react-toastify";
import { editProductData } from "@/APIs/Product/editProductData";

const ProductModal = ({
  setIsOpen,
  productLoading,
  updatedData = null,
  setUpdatedProduct,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const { currUser } = useSelector((state) => state.currentUser);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    brand: "Fiztees",
    originalPrice: 0,
    discount: 20,
    discountedPrice: 0,
    collectionName: "top",
    type: "t-shirt",
    size: selectedSizes,
    discription: "",
    stock: 10,
    ...updatedData,
  });

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
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.filter(
      (file) => !selectedImages?.some((image) => image.name === file.name)
    );
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const {
      name,
      brand,
      originalPrice,
      discountedPrice,
      discount,
      collectionName,
      type,
      size,
      stock,
    } = formData;

    if (!name) newErrors.name = "name is required";
    if (!brand) newErrors.brand = "brand Name is required";
    if (!originalPrice || originalPrice == 0)
      newErrors.originalPrice = "original Price is required";
    if (discount > 90 || discount < 0)
      newErrors.discount = "max discount is 90%";
    if (!collectionName)
      newErrors.collectionName = "collectionName is required";
    if (!type) newErrors.type = "type is required";
    if (!size) newErrors.size = "size is required";
    if (!stock) newErrors.stock = "size is required";
    if (!selectedImages.length > 0)
      newErrors.image = "Please select max 4 and min 2 images.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("error", errors);
      return;
    }

    try {
      dispatch(setProductLoading(true));
      const imageUrls = await uploadImagesToCloudinary(selectedImages);
      if (!updatedData) {
        console.log("add");
        await addProducts(
          {
            ...formData,
            alt: formData.name,
            originalPrice: Number(formData.originalPrice),
            discountedPrice: Number(formData.discountedPrice),
            discount: Number(formData.discount),
            stock: 10,
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
            stock: 10,
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
    <div className="w-screen bg-[#000000b7] absolute top-0 left-0 h-screen flex justify-center items-center">
      <div className="w-[60%] h-[95%] z-50 overflow-y-auto no-scrollbar rounded-lg">
        <div className="w-[100%] bg-white shadow-lg p-6 relative rounded-lg">
          <button
            onClick={() => {
              setIsOpen(false), setUpdatedProduct(null);
            }}
            className="absolute top-[0px] right-2 text-gray-600 hover:text-gray-800 text-3xl"
          >
            &times;
          </button>

          <h3 className="text-[28px] font-semibold mb-5 text-center">
            Add Product
          </h3>

          {productLoading ? (
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

                <FormInput
                  type="text"
                  placeholder="Brand Name"
                  handleChange={handleChange}
                  field={"brand"}
                  errors={errors}
                  formData={formData}
                />

                <FormInput
                  type="text"
                  placeholder="Collection Name"
                  handleChange={handleChange}
                  field={"collectionName"}
                  errors={errors}
                  formData={formData}
                />
              </div>

              <div className="flex gap-4">
                <FormInput
                  type="number"
                  placeholder="Original Price"
                  handleChange={handleChange}
                  field={"originalPrice"}
                  errors={errors}
                  formData={formData}
                />
                <FormInput
                  type="number"
                  placeholder="Discount % (optional)"
                  handleChange={handleChange}
                  field={"discount"}
                  errors={errors}
                  formData={formData}
                />
                <FormInput
                  type="number"
                  placeholder="Discounted Price"
                  field={"discountedPrice"}
                  errors={errors}
                  formData={formData}
                />
              </div>
              <div className="flex gap-4">
                <FormInput
                  type="text"
                  placeholder="Discription"
                  handleChange={handleChange}
                  field={"discription"}
                  errors={errors}
                  formData={formData}
                />
              </div>
              <div className="flex gap-4">
                <FormInput
                  type="text"
                  placeholder="Type"
                  handleChange={handleChange}
                  field={"type"}
                  errors={errors}
                  formData={formData}
                />
                <FormInput
                  type="number"
                  placeholder="Stock"
                  handleChange={handleChange}
                  field={"stock"}
                  errors={errors}
                  formData={formData}
                />
                <SizeSelector
                  selectedSizes={selectedSizes}
                  setSelectedSizes={setSelectedSizes}
                />
              </div>

              <div className="flex gap-2 items-center">
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition duration-300">
                  <span className="text-gray-600 text-[10px] text-center ">
                    Upload Images (min 2, max 4)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <div className="flex gap-2 overflow-auto">
                  {selectedImages?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={
                          typeof image === "object"
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt={`Selected ${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-black w-5 h-5 text-white rounded-full"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className="py-4 w-full mt-2 bg-[#407fc4] text-white text-lg font-semibold rounded-md hover:scale-105 transition duration-300">
                {!updatedData ? "Add Product" : "Edit Product"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
