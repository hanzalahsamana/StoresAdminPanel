'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Actions/Button';
import ImgToIcon from '@/components/Actions/ImgToIcon';
import ToggleSwitch from '@/components/Actions/ToggleSwitch';
import ActionCard from '@/components/Cards/ActionCard';
import CustomCard from '@/components/Cards/CustomCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import { toast } from 'react-toastify';
import FormInput from '@/components/Forms/FormInput';
import { BiError } from 'react-icons/bi';
import IconButton from '@/components/Actions/IconButton';
import { GoChevronDown } from 'react-icons/go';
import axios from 'axios';
import { updatePaymentMethod } from '@/APIs/StoreConfigurations/paymentMethodApi';
import { useSelector } from 'react-redux';
import { updatePaymentMethodValidate } from '@/Utils/FormsValidator';
import { PaymentMethodsStructure } from '@/Structure/PaymentMethodStructure';
import { IoCheckmarkDone } from 'react-icons/io5';

const initialData = {
  cod: {
    isEnabled: false,
    credentials: {},
  },
  jazzcash: {
    isEnabled: false,
    displayName: 'Online Payment (provider jazzcash)',
    credentials: {
      merchantId: '',
      pp_Password: '',
      integritySalt: '',
    },
  },

  easypaisa: {
    isEnabled: false,
    credentials: {
      merchantId: '',
      apiKey: '',
    },
  },
  konnect: {
    isEnabled: false,
    credentials: {},
  },
  alfalah: {
    isEnabled: false,
    credentials: {},
  },
};

const PaymentMethods = () => {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { paymentMethods } = useSelector((state) => state?.storeConfiguration?.storeConfiguration);

  const [loading, setLoading] = useState(false);
  const [editVisibleKey, setEditVisibleKey] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [paymentState, setPaymentState] = useState(initialData);

  useEffect(() => {
    if (!paymentMethods) return;

    const merged = PaymentMethodsStructure.reduce((acc, method) => {
      const backend = paymentMethods.find((m) => m.method === method.key);
      acc[method.key] = backend
        ? {
            ...method.settings,
            isEnabled: backend.isEnabled,
            ...(backend.credentials || {}),
          }
        : method.settings || {};
      return acc;
    }, {});

    setPaymentState(merged);
  }, [paymentMethods]);

  const handleEdit = (key) => {
    setEditVisibleKey((prev) => (prev === key ? null : key));
  };

  const handleFieldChange = (key, fieldName, value) => {
    setPaymentState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [fieldName]: value,
      },
    }));
  };

  const callUpdateAPI = async (key) => {
    try {
      setLoading(true);
      const { isEnabled, ...credentials } = paymentState[key];
      await updatePaymentMethod(currUser?.token, store?._id, {
        method: key,
        data: {
          isEnabled,
          credentials,
        },
      });
      toast.success('Payment method updated.');
    } catch (error) {
      console.error(error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key, value) => {
    const isValid = updatePaymentMethodValidate(key, paymentState[key], setValidationErrors);
    if (!isValid) {
      if (!value) {
        setValidationErrors({});
      }

      handleEdit(key);
      return;
    }
    setPaymentState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isEnabled: value,
      },
    }));
    await callUpdateAPI(key);
  };

  const handleSave = async (key) => {
    const isValid = updatePaymentMethodValidate(key, paymentState[key], setValidationErrors);
    if (!isValid) {
      return;
    }
    await callUpdateAPI(key);
    setEditVisibleKey(null);
  };

  return (
    <BackgroundFrame>
      <div className="border-[1.5px] border-[#788a9a2c] rounded-md overflow-hidden">
        <ActionCard
          icon={<ImgToIcon url={'https://img.icons8.com/color/48/bank-card-back-side.png'} />}
          label={'Payment Methods'}
          actionPosition="top"
          subText={'Manage, Add and Remove payment methods'}
          className={'rounded-none border-none'}
        />

        {PaymentMethodsStructure.map((method) => (
          <div key={method.key} onClick={() => handleEdit(method.key)}>
            <CustomCard
              icon={<ImgToIcon url={method.icon} className="!w-[30px]" />}
              className={`rounded-none border-x-0 border-b-0 border-t !py-5 hover:bg-[#fcfcfc] cursor-pointer ${
                method.disabled && 'opacity-60 cursor-not-allowed pointer-events-none'
              } ${editVisibleKey === method.key && 'bg-[#fcfcfc]'}`}
              title={method.label}
              subText={
                method.subLable ? (
                  method.subLable
                ) : !paymentState[method.key]?.isEnabled ? (
                  'Please enable this to integrate it'
                ) : validationErrors[method.key] ? (
                  <span className="text-red-500 text-sm flex gap-1 items-center">
                    <BiError size={12} /> Invalid credentials
                  </span>
                ) : (
                  <span className="text-green-600 text-sm flex gap-1 items-center">
                    <IoCheckmarkDone size={12} /> valid credentials
                  </span>
                )
              }
              actions={
                !method.comingSoon && (
                  <div className="flex gap-3 items-center">
                    <ToggleSwitch
                      label={paymentState[method.key].isEnabled ? 'Enabled' : 'Disabled'}
                      checked={paymentState[method.key].isEnabled}
                      setChecked={(val) => handleToggle(method.key, val)}
                    />
                    <IconButton icon={<GoChevronDown />} className={'text-gray-400'} />
                  </div>
                )
              }
            >
              {editVisibleKey === method.key && (
                <div className="grid gap-4 pt-4 w-full" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-2 gap-4 pt-4 w-full" onClick={(e) => e.stopPropagation()}>
                    {method.fields
                      .filter((f) => f.input === 'text')
                      .map((field) => (
                        <FormInput
                          key={field.name}
                          label={field.placeholder}
                          layout="label"
                          type="text"
                          className="border border-gray-300 p-2 rounded "
                          placeholder={''}
                          onChange={(e) => handleFieldChange(method.key, field.name, e.target.value)}
                          value={paymentState[method.key][field.name] || ''}
                          error={validationErrors?.[method.key]?.[`${field.name}`]}
                        />
                      ))}
                  </div>
                  <div className="flex justify-end items-center gap-3 w-full">
                    <Button label="Cancel" variant="white" className="!text-red-700 font-medium" size="small" action={() => {}} />
                    <Button label="Save Settings" loading={loading} size="small" action={() => handleSave(method.key)} />
                  </div>
                </div>
              )}
            </CustomCard>
          </div>
        ))}
      </div>
    </BackgroundFrame>
  );
};

export default PaymentMethods;
