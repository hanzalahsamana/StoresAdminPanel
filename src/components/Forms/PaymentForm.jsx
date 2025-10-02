'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteCartData } from '@/Redux/CartData/cartDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/TemplateLoader';
import { getContentByName } from '@/Redux/ContentData/ContentDataSlice';
import { addOrderDataApi } from '@/APIs/Order/PlaceOrder';
import FormInput from '@/components/Forms/FormInput';
import { paymentFormValidate } from '@/Utils/FormsValidator';
import { getBasePath } from '@/Utils/GetBasePath';
import Link from 'next/link';
import DropDown from '../Actions/DropDown';

const initialFormData = {
  email: '',
  country: '',
  firstName: '',
  lastName: '',
  address: '',
  appartment: '',
  city: '',
  postalCode: '',
  phone: '',
};

const PaymentForm = ({ selectedMethod = '', setSelectedMethod = () => {}, errors = {}, requiredContactFields = '' }) => {
  // todo send email in the coupon code

  const dispatch = useDispatch();
  const { paymentMethods } = useSelector((state) => state?.storeConfiguration?.storeConfiguration);
  const [loading, setLoading] = useState(false);
  const { siteName } = useSelector((state) => state.siteName);
  const SiteLogo = useSelector((state) => getContentByName(state, 'Site Logo'));
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex flex-col items-end max-[750px]:items-center mt-4 ">
      <form className="flex flex-wrap">
        <div className="w-full ">
          <h2 className="text-[24px] font-semibold my-4 text-[var(--tmp-txt)]">Payment Method</h2>
          <p className="text-[var(--tmp-ltxt)] mb-4">All transactions are secure and encrypted.</p>

          <DropDown
            placeholder="Select Payment Method"
            defaultOptions={paymentMethods?.map((method) => ({ label: method?.method, value: method?._id }))}
            size="large"
            variant="primary"
            setSelectedOption={setSelectedMethod}
            selectedOption={selectedMethod}
            isStore={true}
          />
        </div>
        <div className="w-full space-y-[18px]">
          <h2 className="text-[24px] font-semibold my-4 text-[var(--tmp-txt)]">Contact</h2>
          {(requiredContactFields === 'bothOpt' || requiredContactFields === 'email') && (
            <FormInput
              size="large"
              type="email"
              placeholder="Email"
              name={'email'}
              value={formData?.email}
              onChange={handleChange}
              error={errors?.email}
              labelClassname={'bg-transparent'}
            />
          )}
          {(requiredContactFields === 'bothOpt' || requiredContactFields === 'phone') && (
            <FormInput size="large" type="tel" placeholder="Phone" onChange={handleChange} name={'phone'} error={errors?.phone} value={formData?.phone} />
          )}
        </div>
        <div className="w-full flex flex-col space-y-[18px]">
          <h3 className="text-[24px] font-semibold mb-0 mt-3 text-[var(--tmp-txt)]">Billing address</h3>

          <FormInput size="large" placeholder="Country" onChange={handleChange} name={'country'} error={errors?.country} value={formData?.country} isStore={true} />

          <div className="flex gap-[10px] w-full">
            <FormInput size="large" placeholder="First Name" onChange={handleChange} name={'firstName'} error={errors?.firstName} value={formData?.firstName} isStore={true} />
            <FormInput size="large" placeholder="Last Name" onChange={handleChange} name={'lastName'} error={errors?.lastName} value={formData?.lastName} isStore={true} />
          </div>
          <FormInput size="large" placeholder="Address" onChange={handleChange} name={'address'} error={errors?.address} value={formData?.address} isStore={true} />
          <FormInput
            size="large"
            placeholder="Appartment"
            onChange={handleChange}
            name={'appartment'}
            error={errors?.appartment}
            value={formData?.appartment}
            required={false}
            isStore={true}
          />
          <div className="flex gap-[10px] w-full">
            <FormInput size="large" placeholder="City" onChange={handleChange} name={'city'} error={errors?.city} value={formData?.city} isStore={true} />
            <FormInput
              size="large"
              type="number"
              placeholder="Postal Code"
              onChange={handleChange}
              name={'postalCode'}
              error={errors?.postalCode}
              value={formData?.postalCode}
              required={false}
              isStore={true}
            />
          </div>
        </div>
        {/* <button className="py-[14px] w-full mt-3 bg-[#407fc4] text-[var(--tmp-wtxt)] text-[22px] font-semibold rounded-md transition-all duration-300 hover:scale-105">
            Place Order
          </button> */}
      </form>
      <div>
        <p className="text-[var(--tmp-txt)] text-[14px] w-full py-3">
          By placing this order, you agree to our{' '}
          <Link href={`${getBasePath()}/pages/terms-of-service`} className="text-[#299ae0] cursor-pointer">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href={`${getBasePath()}/pages/privacy-policy`} className="text-[#299ae0] cursor-pointer">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;
