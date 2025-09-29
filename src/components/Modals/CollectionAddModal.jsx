'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormInput from '@/components/Forms/FormInput';
import { toast } from 'react-toastify';
import { addCollectionApi } from '@/APIs/Collection/addCollection';
import { editCollectionApi } from '@/APIs/Collection/editCollection';
import ImageUploader from '../Uploaders/ImageUploader';
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
        products: updatedData.products || [],
      });
    }
  }, [updatedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, image } = formData;

    if (!name) {
      newErrors.name = 'Collection Name is required';
    }

    if (!image) newErrors.image = 'Collection Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
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

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} extraFuntion={() => setUpdatedData(null)} closeOnEsc={false}>
      <ActionCard
        actionPosition="top"
        label={!updatedData ? 'Add Collection' : 'Update Collection'}
        actions={<Button loading={loading} label={!updatedData ? 'Add Collection' : 'Update Collection'} size="small" action={handleSubmit} />}
      >
        <FormInput label="Collection Name" placeholder="e.g. Summer Collection" onChange={handleChange} name={'name'} value={formData?.name} error={errors?.name} layout="label" />

        <MultiSelectDropdown
          label="Associate Products with Collection"
          defaultOptions={products?.map((product) => ({
            label: product.name,
            value: product._id,
          }))}
          placeholder="Select Products"
          name="products"
          selectedOptions={formData?.products || []}
          setSelectedOptions={(selectedOptions) => {
            setFormData((prev) => ({
              ...prev,
              products: selectedOptions,
            }));
          }}
        />

        <DataSelectionList
          setSelectedData={formData?.products || []}
          selectedData={(selectedOptions) => {
            setFormData((prev) => ({
              ...prev,
              products: selectedOptions,
            }));
          }}
          dataName="products"
          label="Select Products"
        />

        <ImageSlector key={'image'} image={formData['image']} size="large" setImage={(image) => setFormData((prev) => ({ ...prev, image }))} error={errors?.image} />
      </ActionCard>
    </Modal>
  );
};

export default CollectionAddModal;
