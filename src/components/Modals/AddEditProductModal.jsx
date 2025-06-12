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
import VariantsSelector from "../Uploaders/VariantsSelector";
import { MdOutlineCategory, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import ImgToIcon from "../Actions/ImgToIcon";

const AddEditProductModal = ({ isOpen, setIsOpen, updatedData = null }) => {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);

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
    <div className="relative  flex flex-col gap-[20px]">
      <ActionCard
        label={updatedData ? "Edit Product" : "Add Product"}
        icon={updatedData ? <div className="flex items-end">
          <ImgToIcon url={'https://img.icons8.com/color/96/product--v1.png'} />
          <ImgToIcon url={'https://img.icons8.com/plasticine/100/pencil.png'} className={'!w-[20px] -translate-x-4'} />
        </div> :
          <div className="flex items-end">
            <ImgToIcon url={'https://img.icons8.com/doodle/96/t-shirt--v1.png'} />
            <ImgToIcon url={'https://img.icons8.com/ios-glyphs/30/228BE6/macos-maximize.png'} className={'!w-[20px] -translate-x-4'} />
          </div>
        }
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
      />

      <div className="flex flex-wrap gap-5 md:gap-0 ">
        <div className="w-full md:w-3/5 space-y-5 md:pr-[10px]">

          <CustomCard icon={<CgDetailsMore size={20} color="#000" />} title="Product Details" classes="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput name="name" placeholder="Name" value={formData.name || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.name} />
            <FormInput name="brand" placeholder="Brand Name" value={formData.brand || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.brand} />
          </CustomCard>

          <CustomCard icon={<LuGalleryVerticalEnd />} title="Gallery" classes="break-inside-avoid flex-none !p-4 pt-3">
            <MultiImageUploader images={formData.images || []} setImages={(images) => handleChange("images", images)} error={errors.image} />
          </CustomCard>

            <CustomCard icon={<MdOutlineCategory />} title="Variation" info={'Variation is Optional thing Which allow you to devide the product in differnt varieties like Size, Color, etc'} classes="break-inside-avoid flex-none !p-4 pt-3">
        <VariantsSelector />
      </CustomCard>



        </div>

        <div className="w-full md:w-2/5 space-y-5 md:pl-[10px]">

          <CustomCard icon={<IoPricetagsOutline />} title="Pricing" classes="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput type="number" name="originalPrice" placeholder="Original Price" value={formData.originalPrice || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.originalPrice} />
            <FormInput type="number" name="discount" placeholder="Discount %" value={formData.discount || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.discount} />
            <FormInput type="number" name="discountedPrice" placeholder="Discounted Price" value={calculateDiscountedPrice(formData.originalPrice, formData.discount)} readOnly />
          </CustomCard>

          <CustomCard icon={<MdOutlineProductionQuantityLimits />} title="Stock" classes="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput name="type" placeholder="Type" value={formData.type || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.type} />
            <FormInput type="number" name="stock" placeholder="Stock" value={formData.stock || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.stock} />
          </CustomCard>

        </div>
      </div>
    
    </div>
  );
};

export default AddEditProductModal;







