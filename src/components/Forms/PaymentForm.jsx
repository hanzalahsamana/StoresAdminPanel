'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteCartData } from '@/Redux/CartData/cartDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/TemplateLoader';
import { addOrderDataApi } from '@/APIs/Order/PlaceOrder';
import FormInput from '@/components/Forms/FormInput';
import { paymentFormValidate } from '@/Utils/FormsValidator';
import { getBasePath } from '@/Utils/GetBasePath';
import Link from 'next/link';
import DropDown from '../Actions/DropDown';
import CustomCard from '../Cards/CustomCard';
import PaymentMethodSelector from '../Blocks/PaymentMethodSelector';

const PaymentForm = ({ errors = {}, requiredContactFields = '' , formData , handleChange ,  }) => {

  const dispatch = useDispatch();
  const { paymentMethods } = useSelector((state) => state?.storeConfiguration?.storeConfiguration);


  return (
    <div className="w-full flex flex-col items-end max-[750px]:items-center mt-4 ">
      <form className="flex flex-wrap">
        <div className="w-full ">
          <h2 className="text-[24px] font-semibold my-4 text-[var(--tmp-txt)]">Payment Method</h2>
          <PaymentMethodSelector
            paymentMethods={paymentMethods}
            selectedMethod={formData?.paymentInfo}
            setSelectedMethod={(method) => handleChange({ target: { name: 'paymentInfo', value: method } })}
          />
        </div>
        <div className="w-full space-y-[18px]">
          <h2 className="text-[24px] font-semibold my-4 text-[var(--tmp-txt)]">Contact</h2>
          {(!requiredContactFields || requiredContactFields === 'bothOpt' || requiredContactFields === 'email') && (
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
          {(!requiredContactFields || requiredContactFields === 'bothOpt' || requiredContactFields === 'phone') && (
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
