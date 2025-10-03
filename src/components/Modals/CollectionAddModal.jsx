'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormInput from '@/components/Forms/FormInput';
import { toast } from 'react-toastify';
import { addCollectionApi } from '@/APIs/Collection/addCollection';
import { editCollectionApi } from '@/APIs/Collection/editCollection';
import Modal from './Modal';
import { uploadSingleImageToS3 } from '@/APIs/uploadImageS3';
import ActionCard from '../Cards/ActionCard';
import Button from '../Actions/Button';
import MultiSelectDropdown from '../Actions/MultiSelectDropdown';
import ImageSlector from '../Uploaders/ImageSlector';
import DataSelectionList from '../Actions/DataSelectionList';

const initialFormData = {
  name: '',
  image: '',
  products: [],
};
const CollectionAddModal = ({ isOpen, setIsOpen, updatedData = null, setUpdatedData = () => {} }) => {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { products } = useSelector((state) => state.productData);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updatedData) {
      setFormData({
        name: updatedData.name,
        image: updatedData.image,
        products: updatedData.products.map((i) => i?._id) || [],
        metaDescription: updatedData?.metaDescription || '',
        metaTitle: updatedData?.metaTitle || '',
      });
    }
  }, [updatedData]);

  const validateForm = (newFormData = {}, validationName = '') => {
    const newErrors = {};
    const { name, image } = newFormData || formData;
    if (!name && (validationName === 'name' || !validationName)) {
      newErrors.name = 'Collection Name is required';
    }

    if (!image && (validationName === 'image' || !validationName)) newErrors.image = 'Collection Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (value, name) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    validateForm(newFormData, name);
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) {
      return;
    }

    try {
      setLoading(true);
      if (formData?.image && formData?.image instanceof File) {
        const uploadedImageUrl = await uploadSingleImageToS3(currUser?.token, store?._id, formData.image);
        formData.image = uploadedImageUrl;
      }
      if (!updatedData) {
        await addCollectionApi(currUser?.token, store?._id, formData);
      } else {
        await editCollectionApi(currUser?.token, store?._id, updatedData._id, formData);
      }
      toast.success(!updatedData ? 'Collection added successfully' : 'Collection updated successfully');
      setFormData(initialFormData);
      setUpdatedData(null);
      setIsOpen(false);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   validateForm();
  // }, [formData]);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} extraFuntion={() => setUpdatedData(null)} closeOnEsc={false}>
      <ActionCard
        actionPosition="top"
        label={!updatedData ? 'Add Collection' : 'Update Collection'}
        actions={<Button loading={loading} label={!updatedData ? 'Add Collection' : 'Update Collection'} size="small" action={handleSubmit} />}
        className={'pt-8 w-full !gap-[10px]'}
      >
        <div className="grid grid-cols-2 w-full gap-4 border-y py-4">
          <div className="flex flex-col space-y-6">
            <FormInput
              label="Collection Name"
              placeholder="e.g. Summer Collection"
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              name={'name'}
              value={formData?.name}
              error={errors?.name}
            />

            <FormInput
              label="Meta Description"
              placeholder="Enter meta description"
              onChange={(e) => handleChange(e.target.value, 'metaDescription')}
              name={'metaDescription'}
              value={formData?.metaDescription}
              error={errors?.metaDescription}
              required={false}
            />
            <FormInput
              label="Meta Title"
              placeholder="Enter meta title"
              onChange={(e) => handleChange(e.target.value, 'metaTitle')}
              name={'metaTitle'}
              value={formData?.metaTitle}
              error={errors?.metaTitle}
              required={false}
            />
            <DataSelectionList
              setSelectedData={(selectedOptions) => {
                setFormData((prev) => ({
                  ...prev,
                  products: selectedOptions,
                }));
              }}
              selectedData={formData?.products || []}
              dataName="products"
              label="Select Products"
              selectorName="products"
            />
          </div>
          <div className="flex flex-col px-2 justify-start items-center gap-4">
            <ImageSlector
              key={'image'}
              image={formData['image']}
              size="xlarge"
              setImage={(image) => {
                handleChange(image, 'image');
              }}
              error={errors?.image}
              multiple={false}
            />
          </div>
        </div>
      </ActionCard>
    </Modal>
  );
};

export default CollectionAddModal;
