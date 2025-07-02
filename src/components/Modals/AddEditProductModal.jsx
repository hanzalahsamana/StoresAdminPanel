
// Optimized AddEditProductModal with improved form state management, consistent naming, and accurate validations.

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
import { addProducts } from "@/APIs/Product/addProduct";
import { editProductData } from "@/APIs/Product/editProduct";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscountedPrice } from "@/Utils/CalculateDiscountedPrice";
import { uploadImagesToS3, uploadSingleImageToS3 } from "@/APIs/uploadImageS3";
import { productUploadValidate } from "@/Utils/FormsValidator";
import VariantsSelector from "../Uploaders/VariantsSelector";
import { MdMiscellaneousServices, MdOutlineCollection, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import ImgToIcon from "../Actions/ImgToIcon";
import ImageUploader from "../Uploaders/ImageUploader";
import DropDown from "../Actions/DropDown";
import { popularVendors } from "@/Structure/DefaultStructures";
import Checkbox from "../Actions/CheckBox";
import { FaSearchengin } from "react-icons/fa6";

const AddEditProductModal = ({ isOpen, setIsOpen, updatedData = null }) => {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { collections, collectionLoading } = useSelector((state) => state.collection);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedVariationNames, setSelectedVariationNames] = useState([]);
  const [selectedOptionsMap, setSelectedOptionsMap] = useState({});

  useEffect(() => {
    console.log(formData, "🦍🦍🦍");
  }, [formData])

  useEffect(() => {
    if (updatedData) {
      setFormData({
        ...updatedData,
        discountedPrice: calculateDiscountedPrice(updatedData.originalPrice, updatedData.discount),
      });
    } else {
      setFormData({
        name: "",
        vendor: currUser?.brandName || "",
        price: 0,
        comparedAtPrice: 0,
        displayImage: "",
        gallery: [],
        stock: 0,
        showStock: true,
        pronounce: "piece",
        status: "active",
        description: "",
        metaTitle: "",
        metaDescription: "",
        wantsCustomerReview: true,
        trackInventory: true,
        continueSelling: false,
        note: "",
        collections: [],
        ratings: { average: 0, count: 0 },
        variations: [],
        variantRules: [],
        images: [],
        discount: 0,
        originalPrice: 0,
        discountedPrice: 0,
      });
      setSelectedVariationNames([]);
      setSelectedOptionsMap({});
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

    // Clone form data to modify safely
    const finalData = {
      ...formData,
    };

    // Validate before continuing
    if (!productUploadValidate(finalData, setErrors)) return;

    try {
      setLoading(true);

      // Upload tasks array
      const uploadTasks = [];

      // Upload display image if it's a File
      let displayImageUploadTask = Promise.resolve(finalData.displayImage);
      if (finalData.displayImage && finalData.displayImage instanceof File) {
        displayImageUploadTask = uploadSingleImageToS3(currUser?.brandName, finalData.displayImage);
      }

      // Gallery images: split and upload files only
      const galleryFiles = finalData.gallery?.filter((img) => img instanceof File) || [];
      const existingGallery = finalData.gallery?.filter((img) => typeof img === 'string') || [];
      const galleryUploadTask = Promise.all(
        galleryFiles.map((file) => uploadToS3(file))
      );

      // Upload variant images efficiently (reusing duplicates)
      const uploadedMap = new Map();
      const variantUploadTask = Promise.all(
        variantData.map(async (variant) => {
          let imageUrl = variant.imageUrl;

          if (imageUrl && typeof imageUrl !== 'string') {
            return { ...variant, imageUrl }; // Already a string, no upload needed
          }

          if (uploadedMap.has(imageUrl)) {
            imageUrl = uploadedMap.get(imageUrl); // Reuse if already uploaded
          } else {
            const uploaded = await uploadSingleImageToS3(imageUrl);
            uploadedMap.set(imageUrl, uploaded);
            imageUrl = uploaded;
          }

          return {
            ...variant,
            imageUrl,
          };
        })
      );

      // Run all uploads in parallel
      const [displayImageUrl, uploadedGalleryImages, finalVariants] = await Promise.all([
        displayImageUploadTask,
        galleryUploadTask,
        variantUploadTask,
      ]);

      // Prepare final product data
      const productData = {
        ...finalData,
        displayImage: displayImageUrl,
        gallery: [...existingGallery, ...uploadedGalleryImages],
        price: Number(finalData.price),
        comparedAtPrice: Number(finalData.comparedAtPrice),
        stock: Number(finalData.stock),
      };

      // Submit
      if (updatedData) {
        await editProductData(productData, currUser?.brandName, updatedData._id, dispatch);
      } else {
        await addProducts(productData, currUser?.brandName, dispatch);
      }

    } catch (err) {
      toast.error(err?.message || "Something went wrong during product submission.");
    } finally {
      setLoading(false);
    }
  };

  if (collectionLoading || !collections) {
    return
  }

  return (
    <div className="relative flex flex-col gap-[20px]">
      <ActionCard
        label={updatedData ? "Edit Product" : "Add Product"}
        icon={updatedData ? (
          <div className="flex items-end">
            <ImgToIcon url={'https://img.icons8.com/color/96/product--v1.png'} />
            <ImgToIcon url={'https://img.icons8.com/plasticine/100/pencil.png'} className={'!w-[20px] -translate-x-4'} />
          </div>
        ) : (
          <div className="flex items-end">
            <ImgToIcon url={'https://img.icons8.com/doodle/96/t-shirt--v1.png'} />
            <ImgToIcon url={'https://img.icons8.com/ios-glyphs/30/228BE6/macos-maximize.png'} className={'!w-[20px] -translate-x-4'} />
          </div>
        )}
        actions={<>
          <Button
            action={handleSubmit}
            label={updatedData ? "Edit Product" : "Add Product"}
            loading={loading}
            size="small"
          />
          <BackButton link="/products" />
        </>}
        actionPosition="top"
      />

      <div className="flex flex-wrap gap-5 md:gap-0">
        <div className="w-full md:w-3/5 space-y-5 md:pr-[10px]">
          <CustomCard icon={<CgDetailsMore size={20} color="#000" />} title="Product Details" className="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput name="name" label="Product Name" placeholder="e.g. Nike Air Zoom Pegasus 40" layout="label" value={formData.name || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.name} />
            <FormInput name="pronounce" label="Pronounce" placeholder="e.g. Piece , Box" layout="label" value={formData.pronounce || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.pronounce} />
            <DropDown wantsCustomOption={true} label="Vendor" placeholder="e.g. Nike , Kenwood" layout="label" defaultOptions={[store.storeName, ...popularVendors]} selectedOption={formData.vendor || ""} setSelectedOption={(value) => handleChange("vendor", value)} error={errors.vendor} />
          </CustomCard>

          <CustomCard icon={<LuGalleryVerticalEnd />} title="Gallery" className="break-inside-avoid flex-none !p-4 pt-3">
            <label className="text-[14px] font-medium text-textC w-full -mb-2">Display Image</label>
            <ImageUploader size="large" images={formData.displayImage || []} setImages={(images) => handleChange("displayImage", images)} error={errors.displayImage} className={'w-full h-full'} />

            <label className="text-[14px] font-medium text-textC w-full -mb-2">Gallery Images</label>
            <MultiImageUploader images={formData.galleryImages || []} setImages={(images) => handleChange("galleryImages", images)} error={errors.galleryImages} />
          </CustomCard>

          <CustomCard icon={<MdOutlineCollection />} title="Variation" info={'Variation is Optional thing Which allow you to devide the product in differnt varieties like Size, Color, etc'} className="break-inside-avoid flex-none !p-4 pt-3">
            <VariantsSelector />
          </CustomCard>
        </div>

        <div className="w-full md:w-2/5 space-y-5 md:pl-[10px]">
          <CustomCard icon={<IoPricetagsOutline />} title="Pricing" className="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput type="number" name="price" label="Price" placeholder="e.g. 1000" layout="label" value={formData.price || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.price} />
            <FormInput type="number" name="comparedAtPrice" label="Compared At Price" placeholder="e.g. 1200" layout="label" value={formData.comparedAtPrice || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.comparedAtPrice} />
          </CustomCard>

          <CustomCard icon={<MdOutlineProductionQuantityLimits />} title="Stock" className="break-inside-avoid flex-none !p-4 pt-3">
            <Checkbox isCheck={formData.trackInventory} setIsCheck={(val) => handleChange("trackInventory", val)} label="Track Inventory" className={'w-full'} />
            {formData.trackInventory === true && (<>
              <FormInput type="number" name="stock" label="Stock" layout="label" placeholder="e.g. 100" value={formData.stock || 0} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.stock} />
              <Checkbox isCheck={formData.showStock } setIsCheck={(val) => handleChange("showStock", val)} label="Show Stock Number" className={'w-full'} />
              <Checkbox isCheck={formData.continueSelling} setIsCheck={(val) => handleChange("continueSelling", val)} label="Continue selling when out of stock" className={'w-full'} />
            </>)}
          </CustomCard>

          <CustomCard icon={<MdMiscellaneousServices />} title="Extras" className="break-inside-avoid flex-none !p-4 pt-3">
            <MultiSelectDropdown wantsCustomOption={false} label="Associate with collections" placeholder="e.g. Shoes , Shirts" defaultOptions={collections?.map((cat) => (cat.name))} selectedOption={formData.collections || []} setSelectedOption={(value) => handleChange("collections", value)} error={errors.collections} />
            <FormInput name="note" label="Note" layout="label" placeholder="e.g. Wash Seperately" value={formData.note || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.note} />
            <Checkbox isCheck={formData.enableReview} setIsCheck={(val) => handleChange("enableReview", val)} label="Enable Customer Review" className={'w-full'} />
          </CustomCard>

          <CustomCard icon={<FaSearchengin />} title="Meta Info" info={"Meta Info helps search engines understand your product better. 'Meta Title' is the short headline shown in search results, and 'Meta Description' is a short summary that encourages people to click your product. It's optional but useful for improving visibility on Google."} className="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput name="metaTitle" label="Meta Title" layout="label" placeholder="e.g. Stylish Men's Running Shoes" value={formData.metaTitle || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.metaTitle} />
            <FormInput name="metaDescription" label="Meta Description" layout="label" placeholder="e.g. High-performance shoes with breathable mesh ..." value={formData.metaDescription || ""} handleChange={(e) => handleChange(e.target.name, e.target.value)} error={errors.metaDescription} />
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default AddEditProductModal;