'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import CustomCard from '@/components/Cards/CustomCard';
import ActionCard from '@/components/Cards/ActionCard';
import ImgToIcon from '@/components/Actions/ImgToIcon';
import { GoPlus } from 'react-icons/go';
import DiscountCountdownBar from '@/components/UI/DiscountCountdownBar';
import DiscountPopup from '@/components/UI/DiscountPopup';
import Modal from '@/components/Modals/Modal';
import RadioButton from '@/components/Actions/RadioButton';
import Button from '@/components/Actions/Button';
import ToggleSwitch from '@/components/Actions/ToggleSwitch';
import FormInput from '@/components/Forms/FormInput';
import { addAnnouncement } from '@/APIs/StoreDetails/announcement';
import CardLoader from '@/components/Loader/CardLoader';
import { isEqual } from 'lodash';

const initialAnnouncements = {
  discountBar: {
    isActive: false,
    description: '',
    timer: null,
  },
  popup: {
    discountRef: null,
    isActive: false,
    showType: 'reload',
  },
};

const Discount = ({ params }) => {
  const { storeConfiguration, storeConfigurationLoading } = useSelector((state) => state?.storeConfiguration);
  const { currUser } = useSelector((state) => state?.currentUser);

  const [buttonActive, setButtonActive] = useState({ discountBar: false, popup: false });
  const [loading, setLoading] = useState({ popup: false, discountBar: false });
  const [announcement, setAnnouncement] = useState(initialAnnouncements);
  const [removePopupLoading, setRemovePopupLoading] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  console.log('announcement?.discountBar?.timer');
  const isTimerExpire = announcement?.discountBar?.timer && new Date(announcement?.discountBar?.timer).getTime() - Date.now();
  const { discounts, announcements } = storeConfiguration;
  const discountRef = announcement?.popup?.discountRef;
  const { store_id } = params;
  let validate = true;

  const handleDone = async () => {
    if (selectedDiscount) {
      const payload = {
        ...announcement,
        popup: {
          ...(announcement?.popup || initialAnnouncements?.popup),
          discountRef: selectedDiscount?._id,
        },
      };
      await handleSave('popup', payload);
      setModalOpen(false);
    }
  };

  const handleCancel = () => {
    if (discounts && discounts.length > 0 && discountRef) {
      const discount = discounts.find((d) => d?._id === announcement?.popup?.discountRef);
      setSelectedDiscount(discount);
    } else {
      setSelectedDiscount(null);
    }
    setModalOpen(false);
  };

  const handleSave = async (type = '', payload = {}) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    const data = payload[type] || announcement[type];
    if (type === 'discountBar') {
      validate = handleValidation(data);
      if (!validate) {
        setLoading((prev) => ({ ...prev, [type]: false }));
        return;
      }
    }
    await addAnnouncement(data, currUser?.token, store_id, type);
    setLoading((prev) => ({ ...prev, [type]: false }));
  };

  const handleRemoveDiscount = async (type) => {
    setRemovePopupLoading(true);
    await addAnnouncement({ ...initialAnnouncements?.popup }, currUser?.token, store_id, type);
    setSelectedDiscount(null);
    setRemovePopupLoading(false);
  };

  const handleValidation = (data, field) => {
    const errs = {};
    if (!data?.description && (!field || field === 'description')) {
      errs.description = 'Text is required!';
    } else if ((data?.timer && field === 'timer') || !field) {
      const expiry = new Date(data?.timer);
      const now = new Date();
      if (expiry <= now) {
        errs.timer = 'Timer date must be in the future';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  useEffect(() => {
    if (announcements) {
      setAnnouncement(announcements);
      if (discounts && discounts.length > 0) {
        const discount = discounts.find((d) => d?._id === announcements?.popup?.discountRef);
        setSelectedDiscount(discount);
      }
    }
  }, [announcements]);

  useEffect(() => {
    if (announcement) {
      const discountBarChanged = !isEqual(announcement?.discountBar, announcements?.discountBar);
      const popupChanged = !isEqual(announcement?.popup, announcements?.popup);
      setButtonActive({
        discountBar: discountBarChanged,
        popup: popupChanged,
      });
    }
  }, [announcement, announcements]);

  return (
    <BackgroundFrame>
      <ActionCard
        label="Announcement"
        actionPosition="top"
        icon={
          <ImgToIcon
            url="https://img.icons8.com/external-stickers-smashing-stocks/70/external-Sale-Announcement-sale-and-cashback-refund-stickers-smashing-stocks.png"
            className="!w-[50px]"
          />
        }
        className="w-full"
      />

      {/* discount bar  */}
      <CustomCard title="Discount Bar" className="w-full flex !justify-start">
        {!storeConfigurationLoading ? (
          <div className="flex flex-col w-full gap-6 !justify-start">
            <>
              <div className="w-max">
                <ToggleSwitch
                  label="Is Active"
                  checked={announcement?.discountBar?.isActive}
                  setChecked={(val) =>
                    setAnnouncement((prev) => ({
                      ...prev,
                      discountBar: { ...prev.discountBar, isActive: val },
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <FormInput
                  name="description"
                  value={announcement?.discountBar?.description}
                  onChange={(e) => {
                    setAnnouncement((prev) => ({ ...prev, discountBar: { ...prev?.discountBar, description: e.target.value } }));
                    handleValidation({ description: e.target.value }, 'description');
                  }}
                  label="Text"
                  placeholder="Enter text"
                  error={errors?.description}
                />
                <FormInput
                  type="date"
                  name="timer"
                  value={announcement?.discountBar?.timer?.split('T')[0]}
                  onChange={(e) => {
                    setAnnouncement((prev) => ({ ...prev, discountBar: { ...prev?.discountBar, timer: e.target.value } }));
                    handleValidation({ timer: e.target.value }, 'timer');
                  }}
                  label="Timer"
                  required={false}
                  error={errors?.timer}
                />
              </div>
            </>
            <div className="p-3 border rounded-md w-full">
              <p className="mb-3">Preview</p>
              {!announcement?.discountBar?.description ? (
                <p className="p-4 bg-gray-500/20 font-semibold text-center">Please fill the description</p>
              ) : isTimerExpire && isTimerExpire <= 0 ? (
                <p className="p-4 bg-gray-500/20 font-semibold text-center">Your Date is expires!</p>
              ) : (
                <DiscountCountdownBar announcement={announcement?.discountBar} />
              )}
            </div>
            <div className="mt-2 ml-auto">
              <Button
                label="Save"
                action={() => handleSave('discountBar')}
                size="small"
                loading={loading?.discountBar}
                active={buttonActive?.discountBar && announcement?.discountBar?.description}
              />
            </div>
          </div>
        ) : (
          <CardLoader />
        )}
      </CustomCard>

      {/* popup modal */}
      <CustomCard
        title="Popup Modal"
        className="w-full"
        actions={
          <div className="flex gap-4">
            <Button
              action={() => {
                setModalOpen(true);
              }}
              icon={<GoPlus />}
              label={!discountRef ? 'Connect Discount' : 'Change discount'}
              variant="black"
              size="small"
            />
            {discountRef && <Button action={() => handleRemoveDiscount('popup')} label="Remove Popup" variant="danger" size="small" loading={removePopupLoading} />}
          </div>
        }
      >
        {!storeConfigurationLoading && discounts && discounts.length > 0 && discountRef ? (
          <div className="flex flex-col items-start w-full gap-4">
            <div className="flex justify-between w-full items-center mb-4 flex-row-reverse gap-4">
              <ToggleSwitch
                label="Is Active"
                checked={announcement.popup.isActive}
                setChecked={(val) =>
                  setAnnouncement((prev) => ({
                    ...prev,
                    popup: { ...prev.popup, isActive: val },
                  }))
                }
              />
              <RadioButton
                label="When to show this popup"
                options={['reload', 'firstVisit']}
                selectedOption={announcement.popup.showType}
                setSelectedOption={(val) =>
                  setAnnouncement((prev) => ({
                    ...prev,
                    popup: { ...prev.popup, showType: val },
                  }))
                }
                className="flex gap-4 items-center !space-y-0 capitalize"
              />
            </div>

            <div className="p-3 border rounded-md w-full ">
              <p className="mb-3">Preview</p>
              <DiscountPopup isOpen={true} position="static" />
            </div>
            <div className="mt-2 ml-auto">
              <Button label="Save" action={() => handleSave('popup')} size="small" loading={loading?.popup} active={buttonActive?.popup} />
            </div>
          </div>
        ) : storeConfigurationLoading ? (
          <CardLoader />
        ) : (
          <p className="text-center p-4 font-semibold text-lg">Please select discount!</p>
        )}
      </CustomCard>

      {/* Select Discount Modal */}
      <Modal isOpen={modalOpen} className="!max-w-[500px]" setIsOpen={handleCancel}>
        <ActionCard
          label="Select Discount"
          subText="Select discount you want to associate"
          actions={
            <>
              <Button label="Cancel" action={handleCancel} variant="white" size="small" />
              <Button label="Done" action={handleDone} size="small" active={selectedDiscount && selectedDiscount?._id !== discountRef} loading={loading?.popup} />
            </>
          }
        >
          {discounts && discounts.length > 0 ? (
            <RadioButton
              options={discounts?.map((d) => ({ label: d?.name, value: d?._id }))}
              selectedOption={selectedDiscount?._id}
              setSelectedOption={(val) => {
                const found = discounts.find((d) => d?._id === val);
                setSelectedDiscount(found);
              }}
            />
          ) : (
            <p className="text-center p-4 font-semibold text-lg">Discounts not found!</p>
          )}
        </ActionCard>
      </Modal>
    </BackgroundFrame>
  );
};

export default Discount;
