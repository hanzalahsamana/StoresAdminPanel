// Optimized AddEditProductModal with improved form state management, consistent naming, and accurate validations.

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import FormInput from '../Forms/FormInput';
import ActionCard from '../Cards/ActionCard';
import Button from '../Actions/Button';
import CustomCard from '../Cards/CustomCard';
import BackButton from '../Actions/BackButton';
import { toast } from 'react-toastify';
import { addProducts } from '@/APIs/Product/addProduct';
import { editProductData } from '@/APIs/Product/editProduct';
import { useDispatch, useSelector } from 'react-redux';
import { calculateDiscountedPrice } from '@/Utils/CalculateDiscountedPrice';
import { productUploadValidate } from '@/Utils/FormsValidator';
import VariantsSelector from '../Uploaders/VariantsSelector';
import { MdMiscellaneousServices, MdOutlineCollections, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { IoPricetagsOutline } from 'react-icons/io5';
import { CgDetailsMore } from 'react-icons/cg';
import { LuGalleryVerticalEnd } from 'react-icons/lu';
import ImgToIcon from '../Actions/ImgToIcon';
import DropDown from '../Actions/DropDown';
import { popularVendors } from '@/Structure/DefaultStructures';
import Checkbox from '../Actions/CheckBox';
import { FaSearchengin } from 'react-icons/fa6';
import DataSelectionList from '../Actions/DataSelectionList';
import ImageSelector from '../Uploaders/ImageSlector';
import { cleanObjectFields } from '@/Utils/cleanObjectFields';
import { getEditFields } from '@/Utils/getEditFields';

const initialProductData = {
  name: 'qwerrty',
  pronounce: 'piece',
  vendor: '',
  price: 1230,
  comparedAtPrice: 0,
  displayImage: '',
  gallery: [],
  trackInventory: true,
  stock: 0,
  continueSelling: false,
  status: 'active',
  description: '',
  note: '',
  metaTitle: '',
  metaDescription: '',
  wantsCustomerReview: true,
  collections: [],
  ratings: { average: 0, count: 0 },
  variations: [],
};

const AddEditProductModal = ({ isOpen, updatedData = null }) => {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedVariationNames, setSelectedVariationNames] = useState([]);
  const [selectedOptionsMap, setSelectedOptionsMap] = useState({});
  const stableVariants = useMemo(() => updatedData?.variants || [], [updatedData]);
  const stableVariations = useMemo(() => updatedData?.variations || [], [updatedData]);
  const [variantsData, setVariantsData] = useState([]);
  const [variationData, setVariationData] = useState([]);

  useEffect(() => {
    setVariationData(updatedData?.variations);
    setVariantsData(updatedData?.variants);
  }, [updatedData]);  
  console.log("Testing infinite Loop==>")
  
  useEffect(() => {
    if (updatedData) {
      setFormData({
        ...updatedData,
      });
    } else {
      setFormData(initialProductData);
      setSelectedVariationNames([]);
      setSelectedOptionsMap({});
    }
    console.log('✨');
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

  console.log('✨✨');

  const handleChange = (key, value) => {
    setErrors((prev) => ({ ...prev, [key]: '' }));
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

      const productData = {
        ...finalData,
        price: Number(finalData.price),
        comparedAtPrice: Number(finalData.comparedAtPrice),
        stock: Number(finalData?.stock),
        variants: variantsData,
        variations: variationData,
      };
      const editPayload = cleanObjectFields(productData, ['_id', '__v', 'storeRef', 'productId', 'updatedAt', 'createdAt', 'totalSold', 'slug']);
      // Submit
      if (updatedData) {
        await editProductData(editPayload, store?._id, updatedData._id, currUser?.token);
        toast.success('Changes Saved');
      } else {
        await addProducts(currUser?.token, store?._id, productData);
        toast.success('Successfully Created');
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  // if (collectionLoading || !collections) {
  //   return
  // }

  return (
    <div className="relative flex flex-col gap-[20px]">
      <ActionCard
        label={updatedData ? 'Edit Product' : 'Add Product'}
        icon={
          updatedData ? (
            <div className="flex items-end">
              <ImgToIcon url={'https://img.icons8.com/color/96/product--v1.png'} />
              <ImgToIcon url={'https://img.icons8.com/plasticine/100/pencil.png'} className={'!w-[20px] -translate-x-4'} />
            </div>
          ) : (
            <div className="flex items-end">
              <ImgToIcon url={'https://img.icons8.com/doodle/96/t-shirt--v1.png'} />
              <ImgToIcon url={'https://img.icons8.com/ios-glyphs/30/228BE6/macos-maximize.png'} className={'!w-[20px] -translate-x-4'} />
            </div>
          )
        }
        actions={
          <>
            <Button action={handleSubmit} label={'Cancel'} loading={loading} size="small" variant="white" />
            <Button action={handleSubmit} label={'Save Product'} loading={loading} size="small" variant="black" />
            <BackButton link="/products" />
          </>
        }
        actionPosition="top"
      />

      <div className="flex flex-wrap gap-5 md:gap-0">
        <div className="w-full md:w-3/5 space-y-5 md:pr-[10px]">
          <CustomCard icon={<CgDetailsMore size={20} color="#000" />} title="Product Details" className="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput
              name="name"
              label="Product Name"
              placeholder="e.g. Nike Air Zoom Pegasus 40"
              layout="label"
              value={formData.name || ''}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              error={errors.name}
            />
            <FormInput
              name="pronounce"
              label="Pronounce"
              placeholder="e.g. Piece , Box"
              layout="label"
              value={formData.pronounce || ''}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              error={errors.pronounce}
            />
            <DropDown
              wantsCustomOption={true}
              label="Vendor"
              placeholder="e.g. Nike , Kenwood"
              layout="label"
              defaultOptions={[store.storeName, ...popularVendors]}
              selectedOption={formData.vendor || ''}
              setSelectedOption={(value) => handleChange('vendor', value)}
              error={errors.vendor}
            />
          </CustomCard>

          <CustomCard icon={<LuGalleryVerticalEnd />} title="Gallery" className="break-inside-avoid flex-none flex flex-nowrap !p-4 pt-3">
            <div className="flex flex-col items-start gap-4 justify-start w-full">
              <ImageSelector size="xlarge" label="Display Image" image={formData.displayImage || ''} setImage={(image) => handleChange('displayImage', image)} multiple={false} />
              <ImageSelector size="large" label="Gallery Images" image={formData.gallery || []} setImage={(images) => handleChange('gallery', images)} multiple={true} />
            </div>
          </CustomCard>

          <CustomCard
            icon={<MdOutlineCollections />}
            title="Variation"
            info={'Variation is Optional thing Which allow you to devide the product in differnt varieties like Size, Color, etc'}
            className="break-inside-avoid flex-none !p-4 pt-3"
          >
            <VariantsSelector variantsData={variantsData} setVariantsData={setVariantsData} variationData={variationData} setVariationData={setVariationData} />
          </CustomCard>
        </div>

        <div className="w-full md:w-2/5 space-y-5 md:pl-[10px]">
          <CustomCard icon={<IoPricetagsOutline />} title="Pricing" className="break-inside-avoid flex-none !p-4 pt-3">
            <FormInput
              type="number"
              name="price"
              label="Price"
              placeholder="e.g. 1000"
              layout="label"
              value={formData.price || 0}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              error={errors.price}
              prefix={'Rs'}
              suffix={'PKR'}
            />
            <FormInput
              type="number"
              name="comparedAtPrice"
              label="Compared At Price"
              placeholder="e.g. 1200"
              layout="label"
              value={formData.comparedAtPrice || 0}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              error={errors.comparedAtPrice}
              prefix={'Rs'}
              suffix={'PKR'}
            />
          </CustomCard>

          <CustomCard icon={<MdOutlineProductionQuantityLimits />} title="Stock" className="break-inside-avoid flex-none !p-4 pt-3">
            <Checkbox checked={formData.trackInventory} setChecked={(val) => handleChange('trackInventory', val)} label="Track Inventory" className={'w-full'} />
            {formData.trackInventory === true && (
              <>
                <FormInput
                  type="number"
                  name="stock"
                  label="Stock"
                  layout="label"
                  placeholder="e.g. 100"
                  value={formData.stock || 0}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  error={errors.stock}
                />
                <Checkbox
                  checked={formData.continueSelling}
                  setChecked={(val) => handleChange('continueSelling', val)}
                  label="Continue selling when out of stock"
                  className={'w-full'}
                />
              </>
            )}
          </CustomCard>

          <CustomCard icon={<MdMiscellaneousServices />} title="General" className="break-inside-avoid flex-none !p-4 pt-3">
            <DataSelectionList selectorName="collections" selectedData={formData.collections || []} setSelectedData={(value) => handleChange('collections', value)} />
            <DataSelectionList
              selectorName="products"
              selectedData={formData.relatedProducts || []}
              setSelectedData={(value) => handleChange('relatedProducts', value)}
              limit={4}
            />
            <FormInput
              name="note"
              label="Note"
              layout="label"
              placeholder="e.g. Wash Seperately"
              value={formData.note || ''}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              error={errors.note}
            />
            <Checkbox checked={formData.enableReview} setChecked={(val) => handleChange('enableReview', val)} label="Enable Customer Review" className={'w-full'} />
          </CustomCard>

          <CustomCard
            icon={<FaSearchengin />}
            title="Meta Info"
            info={
              "Meta Info helps search engines understand your product better. 'Meta Title' is the short headline shown in search results, and 'Meta Description' is a short summary that encourages people to click your product. It's optional but useful for improving visibility on Google."
            }
            className="break-inside-avoid flex-none !p-4 pt-3"
          >
            <FormInput
              name="metaTitle"
              label="Meta Title"
              layout="label"
              placeholder="e.g. Stylish Men's Running Shoes"
              value={formData.metaTitle || ''}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              error={errors.metaTitle}
            />
            <FormInput
              name="metaDescription"
              label="Meta Description"
              layout="label"
              placeholder="e.g. High-performance shoes with breathable mesh ..."
              value={formData.metaDescription || ''}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              error={errors.metaDescription}
            />
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default AddEditProductModal;
