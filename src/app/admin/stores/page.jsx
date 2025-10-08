'use client';

import { useState } from 'react';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import ActionCard from '@/components/Cards/ActionCard';
import FormInput from '@/components/Forms/FormInput';
import DropDown from '@/components/Actions/DropDown';
import Button from '@/components/Actions/Button';
import Modal from '@/components/Modals/Modal';
import { toast } from 'react-toastify';
import { generateSlug } from '@/Utils/GenerateSlug';
import { Base_Domain } from 'config';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { HTTP } from 'config';
import { FiArrowUpRight } from 'react-icons/fi';
import { generateStore } from '@/APIs/StoreDetails/generateStore';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Loader from '@/components/Loader/loader';
import { AiOutlineDelete } from 'react-icons/ai';

const StoreDetails = ({ onClose, onComplete }) => {
  const { allStores, allStoresLoading } = useSelector((state) => state.allStores);
  const { currUser } = useSelector((state) => state.currentUser);

  const [formData, setFormData] = useState({
    storeName: '',
    storeType: '',
    referralCode: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.storeName.trim()) errs.storeName = 'Brand name is required';
    if (!formData.storeType || typeof formData.storeType !== 'string') errs.storeType = 'Select a store type';
    if (formData.referralCode && typeof formData.referralCode !== 'string') {
      errs.referralCode = 'Referral code must be a valid string';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validate()) return;
    setLoading(true);
    const payload = {
      storeName: formData.storeName,
      storeType: formData.storeType,
      subDomain: generateSlug(formData.storeName),
      // referralCode: formData.referralCode,
    };
    await generateStore(currUser?.token, {
      ...payload,
      referralCode: formData?.referralCode ? referralCode : formData?.referralCode,
    });
    setShowModal(false);
    setFormData({ storeName: '', storeType: '' }); // Reset form
    onComplete?.();
    setLoading(false);
  };

  if (allStoresLoading) {
    return <Loader />;
  }

  return (
    <BackgroundFrame className="flex items-center justify-center min-h-screen">
      <ActionCard
        label="Your Stores"
        subText="Select a store to proceed or create a new one."
        className="p-[20px] max-w-[450px]"
        icon={<ImgToIcon url={'https://img.icons8.com/matisse/100/shop.png'} />}
        actions={<Button label="Create Store" action={() => setShowModal(true)} size="small" variant="black" icon={<FaArrowRightLong />} iconPosition="right" iconOnHover={true} />}
        actionPosition="top"
      >
        <div className="max-h-[300px] pr-2 overflow-y-auto customScroll flex flex-col gap-4">
          {allStores.length > 0 &&
            allStores.map((store, index) => (
              <Link
                key={index}
                href={`/admin/${store?._id}`}
                className="flex items-center justify-between gap-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer group"
              >
                {/* <div className="text-[30px]">#{index + 1}</div> */}
                <div className="flex items-start flex-col">
                  <p className="text-lg font-semibold capitalize">{store?.storeName}</p>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center text-blue-400 text-sm hover:underline"
                    href={`${HTTP}${store?.subDomain || store?.storeName}.${Base_Domain}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {store?.subDomain || store?.storeName}.{Base_Domain} <FiArrowUpRight />
                  </a>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <AiOutlineDelete className="text-textC hover:text-red-500 text-[20px]" />
                  <p className="text-textTC text-sm" title="last visited">
                    21 Feb, 24
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </ActionCard>

      {/* Modal */}
      <Modal isOpen={showModal} setIsOpen={setShowModal} position="fixed bg-opacity-30" className="!max-w-[550px]">
        <ActionCard
          label="Generate Your Store"
          subText="Please provide your store details to proceed."
          className="p-[30px]"
          actions={
            <Button
              label="Generate"
              action={handleSaveChanges}
              loading={loading}
              size="small"
              variant="black"
              icon={<FaArrowRightLong />}
              iconPosition="right"
              iconOnHover={true}
            />
          }
          actionPosition="top"
        >
          <FormInput
            name="referralCode"
            value={formData.referralCode}
            onChange={(e) => handleChange('referralCode', e.target.value)}
            label="Promo Code"
            error={errors.referralCode}
            placeholder="Enter promo code"
            layout="label"
            required={false}
          />
          <FormInput
            name="storeName"
            value={formData.storeName}
            onChange={(e) => handleChange('storeName', e.target.value)}
            label="Brand Name"
            error={errors.storeName}
            placeholder="Enter your brand name"
            layout="label"
          />

          {formData.storeName && (
            <p className="text-[10px] -mt-4 text-textTC">
              Your store subdomain will be{' '}
              <span className="text-primaryC">
                {generateSlug(formData.storeName)}.{Base_Domain}
              </span>
            </p>
          )}

          <DropDown
            defaultOptions={[
              'Apparel',
              'Perfume',
              'Electronics',
              'Health & Beauty',
              'Home Decor',
              'Food & Grocery',
              'Toys & Games',
              'Baby Products',
              'Furniture',
              'Arts & Crafts',
              'Mobile Accessories',
              'Watches & Accessories',
            ]}
            selectedOption={formData.storeType}
            setSelectedOption={(val) => handleChange('storeType', val)}
            label="Select Your Store Type"
            wantsCustomOption={true}
            layout="label"
            placeholder="eg: clothing store"
            error={errors?.storeType}
          />
        </ActionCard>
      </Modal>
    </BackgroundFrame>
  );
};

export default StoreDetails;
