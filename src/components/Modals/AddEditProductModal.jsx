"use client";

import React, { useEffect, useState } from "react";
import FormInput from "../Forms/FormInput";
import MultiImageUploader from "../Uploaders/MultiImageUploader";
import ActionCard from "../Cards/ActionCard";
import Button from "../Actions/Button";
import CustomCard from "../Cards/CustomCard";
import BackButton from "../Actions/BackButton";
import MultiSelectDropdown from "../Actions/MultiSelectDropdown";
import { toast } from "react-toastify";
import { addProducts } from "@/APIs/Product/addProductData";
import { editProductData } from "@/APIs/Product/editProductData";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscountedPrice } from "@/Utils/CalculateDiscountedPrice";
import { uploadImagesToS3 } from "@/APIs/uploadImageS3";
import { productUploadValidate } from "@/Utils/FormsValidator";
import MultiSelectCheckbox from "../Actions/MultiSelectCheckbox";
import VariantsSelector from "../Uploaders/VariantsSelector";

const AddEditProductModal = ({ isOpen, setIsOpen, updatedData = null }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { currUser } = useSelector((state) => state.currentUser);
  const { variations } = useSelector((state) => state?.storeDetail?.storeDetail);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedVariationNames, setSelectedVariationNames] = useState([]);
  const [selectedOptionsMap, setSelectedOptionsMap] = useState({});

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
        variationData: [],
      });
      setSelectedOptionsMap({});
      setSelectedVariationNames([]);
    }
  }, [updatedData]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({});
        setErrors({});
        setLoading(false);
        setSelectedOptionsMap({});
        setSelectedVariationNames([]);
      }, 0);
    }
  }, [isOpen]);

  const handleChange = (key, value) => {
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalVariationData = selectedVariationNames.map((varName) => ({
      name: varName,
      options: selectedOptionsMap[varName] || [],
    }));

    const finalData = { ...formData, variationData: finalVariationData };

    if (!productUploadValidate(finalData, setErrors)) return;

    try {
      setLoading(true);

      let imagesToUpload = finalData.images.filter((img) => img instanceof File);
      let existingImages = finalData.images.filter((img) => typeof img === "string");

      if (imagesToUpload.length > 0) {
        const uploadedImagesUrls = await uploadImagesToS3(currUser?.brandName, imagesToUpload);
        finalData.images = [...existingImages, ...uploadedImagesUrls];
      }

      const productData = {
        ...finalData,
        alt: finalData.name,
        originalPrice: Number(finalData.originalPrice),
        discountedPrice: Number(finalData.discountedPrice),
        discount: Number(finalData.discount),
      };

      if (!updatedData) {
        await addProducts(productData, currUser?.brandName, dispatch);
      } else {
        await editProductData(productData, currUser?.brandName, updatedData._id, dispatch);
      }

      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-[20px]">
      <ActionCard
        lable={updatedData ? "Edit Product" : "Add Product"}
        actions={
          <>
            <Button
              action={handleSubmit}
              label={updatedData ? "Edit Product" : "Add Product"}
              loading={loading}
              size="small"
            />
            <BackButton link={"/products"} />
          </>
        }
        actionPosition="top"
        className={"rounded-sm"}
      />

      <div className="flex flex-wrap gap-5 md:gap-0">
        <div className="w-full md:w-3/5 space-y-5 md:pr-[10px]">

          <CustomCard title="Product Details" classes="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput name="name" placeholder="Name" value={formData.name || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.name} />
            <FormInput name="brand" placeholder="Brand Name" value={formData.brand || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.brand} />
          </CustomCard>

          <CustomCard title="Gallery" classes="break-inside-avoid flex-none !p-4 pt-3">
            <MultiImageUploader images={formData.images || []} setImages={(images) => handleChange("images", images)} error={errors.image} />
          </CustomCard>

          <CustomCard title="Variation" classes="break-inside-avoid flex-none !p-4 pt-3 ">
            {/* <MultiSelectDropdown
              defaultOptions={variations.map((v) => v?.name) || []}
              selectedOptions={selectedVariationNames}
              setSelectedOptions={setSelectedVariationNames}
              placeholder="Select global variations to use"
            />
            {selectedVariationNames.length > 0 && (
              <p className="text-left w-full">Choose variation options to use in that product</p>
            )}
            <div className="grid grid-cols-3 flex-col items-start w-full gap-4">

              {selectedVariationNames.map((varName, index) => {
                const currentOptions = variations.find((v) => v.name === varName)?.options || [];
                return (
                  <MultiSelectCheckbox
                    options={currentOptions}
                    selectedOptions={selectedOptionsMap[varName] || []}
                    setSelectedOptions={(option) =>
                      setSelectedOptionsMap((prev) => ({ ...prev, [varName]: option }))
                    }
                    key={index}
                    lable={`${varName}`}
                  />


                );
              })}
            </div> */}
            <VariantsSelector/>
          </CustomCard>

        </div>

        <div className="w-full md:w-2/5 space-y-5 md:pl-[10px]">

          <CustomCard title="Pricing" classes="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput type="number" name="originalPrice" placeholder="Original Price" value={formData.originalPrice || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.originalPrice} />
            <FormInput type="number" name="discount" placeholder="Discount %" value={formData.discount || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.discount} />
            <FormInput type="number" name="discountedPrice" placeholder="Discounted Price" value={calculateDiscountedPrice(formData.originalPrice, formData.discount)} readOnly />
          </CustomCard>

          <CustomCard title="Stock" classes="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput name="type" placeholder="Type" value={formData.type || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.type} />
            <FormInput type="number" name="stock" placeholder="Stock" value={formData.stock || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.stock} />
          </CustomCard>

        </div>
      </div>
    </div>
  );
};

export default AddEditProductModal;
