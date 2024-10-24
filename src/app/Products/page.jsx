"use client";

import React, { useState } from "react";
import { addProducts } from "@/APIs/postApis";
import { uploadImagesToCloudinary } from "@/Utils/uploadToCloudinary";
import { useSelector } from "react-redux";
import FormInput from "@/components/FormInput";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import SizeSelector from "@/components/SizesFields";

const AddProduct = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const user = useSelector((state) => state.currentUser);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    brand: "Hannan Fabrics",
    originalPrice: 0,
    discount: 30,
    discountedPrice: 0,
    collectionName: "Heritage",
    type: "Unstiched",
    size: 2.5,
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.filter(
      (file) => !selectedImages.some((image) => image.name === file.name)
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
    if (selectedImages.length > 4 || selectedImages.length < 2)
      newErrors.image = "Please select max 4 and min 2 images.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const imageUrls = await uploadImagesToCloudinary(selectedImages);

      await addProducts(
        {
          ...formData,
          alt: formData.name,
          originalPrice: Number(formData.originalPrice),
          discountedPrice: Number(formData.discountedPrice),
          discount: Number(formData.discount),
          size: parseFloat(formData.size),
          status: true,
          images: imageUrls,
        },
        user?.brandName
      );
      // setFormData({
      //     name: "",
      //     brand: "Hannan Fabrics",
      //     originalPrice: 0,
      //     discountedPrice: 0,
      //     discount: 30,
      //     collectionName: "Heritage",
      //     type: "Unstiched",
      //     size: 2.5,
      // })
      // setSelectedImages([])
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="w-full flex justify-center p-[30px]">
      <div className="max-w-[1300px] w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap"
          encType="multipart/formdata"
        >
          <div className="w-full">
            <h3 className="text-[28px] font-semibold my-[5px]">
              Product Detail
            </h3>

            <FormInput
              type="text"
              placeholder="Name"
              handleChange={handleChange}
              field={"name"}
              errors={errors}
              formData={formData}
            />
            <div className="flex gap-[10px] w-full">
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
            <div className="flex gap-[10px] w-full">
              <FormInput
                type="number"
                placeholder="Original Price"
                handleChange={handleChange}
                field={"originalPrice"}
                errors={errors}
                formData={formData}
                readonly
              />

              <FormInput
                type="number"
                placeholder="Discount % (optional)"
                handleChange={handleChange}
                field={"discount"}
                errors={errors}
                formData={formData}
              />
            </div>
            <FormInput
              type="number"
              placeholder="Discounted Price = originalPrice - discount "
              // handleChange={handleChange}
              field={"discountedPrice"}
              errors={errors}
              formData={formData}
            />

              <SizeSelector/>
            <div className="flex gap-[10px] w-full">
              {/* <FormInput
                type="number"
                placeholder="Size (meters)"
                handleChange={handleChange}
                field={"size"}
                errors={errors}
                formData={formData}
              /> */}
              <FormInput
                type="text"
                placeholder="Type"
                handleChange={handleChange}
                field={"type"}
                errors={errors}
                formData={formData}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[20px] relative">
            {errors.image && (
              <p className=" absolute bottom-[-25px] text-red-500 text-[10px]">
                {errors.image}
              </p>
            )}

            <label className="flex w-[100px] h-[100px] justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition duration-300">
              <span className="text-gray-600 text-[10px]">
                Upload Images
                <br /> (min 2) (max 4)
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="flex w-[full] grow-1 overflow-auto gap-2 ">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute flex justify-center items-center top-0 right-0 bg-black w-5 h-5 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className="py-[20px] w-full mt-3 bg-[#407fc4] text-[#e6e6e6] text-[18px] font-semibold rounded-md transition-all duration-300 hover:scale-105">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProtectedRoute(AddProduct);
