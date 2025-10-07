'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
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
import Loader from '@/components/Loader/loader';
import CardLoader from '@/components/Loader/CardLoader';
import { isEqual } from 'lodash';

const defaultDiscount = {
  name: 'NEWYEAR2025',
  discountType: 'global',
  access: 'all',
  amountType: 'percent',
  amount: 25,
  isActive: true,
  expiryDate: '2027-10-09T09:49:00.000+00:00',
};

const Discount = ({ params }) => {
  const { storeConfiguration, storeConfigurationLoading } = useSelector((state) => state?.storeConfiguration);
  const { discounts, announcements } = storeConfiguration;
  const { currUser } = useSelector((state) => state?.currentUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [loading, setLoading] = useState({ popup: false, discountBar: false });
  const [buttonActive, setButtonActive] = useState({ discountBar: false, popup: false });
  const [errors, setErrors] = useState({});
  const { store_id } = params;

  const [announcementState, setAnnouncementState] = useState({
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
  });

  const handleDone = () => {
    if (selectedDiscount) {
      setAnnouncementState((prev) => ({
        ...prev,
        popup: {
          ...prev.popup,
          discountRef: selectedDiscount?._id,
        },
      }));
      setModalOpen(false);
      setSelectedDiscount(null);
    }
  };

  const handleSave = async (type) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    const data = announcementState[type];
    await addAnnouncement(data, currUser?.token, store_id, type);
    setLoading((prev) => ({ ...prev, [type]: false }));
  };

  const handleRemoveDiscount = (type) => {
    setAnnouncementState((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        discountRef: null,
      },
    }));
    setSelectedDiscount(null)
  };

  useEffect(() => {
    if (announcements) {
      setAnnouncementState(announcements);
      if (discounts && discounts.length > 0) {
        const discount = discounts.find((d) => d?._id === announcements?.popup?.discountRef);
        setSelectedDiscount(discount);
      }
    }
  }, [announcements]);

  useEffect(() => {
    if (announcements && announcementState) {
      const discountBarChanged = !isEqual(announcementState?.discountBar, announcements?.discountBar);

      const popupChanged = !isEqual(announcementState?.popup, announcements?.popup);

      setButtonActive({
        discountBar: discountBarChanged,
        popup: popupChanged,
      });
    }
  }, [announcementState, announcements]);

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

      <CustomCard title="Discount Bar" className="w-full flex !justify-start">
        {!storeConfigurationLoading ? (
          <div className="flex flex-col w-full gap-6 !justify-start">
            <>
              <div className="w-max">
                <ToggleSwitch
                  label="Is Active"
                  checked={announcementState?.discountBar?.isActive}
                  setChecked={(val) =>
                    setAnnouncementState((prev) => ({
                      ...prev,
                      discountBar: { ...prev.discountBar, isActive: val },
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <FormInput
                  name="description"
                  value={announcementState?.discountBar?.description}
                  onChange={(e) => {
                    setAnnouncementState((prev) => ({ ...prev, discountBar: { ...prev?.discountBar, description: e.target.value } }));
                  }}
                  label="Text"
                  placeholder="Enter text"
                />
                <FormInput
                  type="date"
                  name="timer"
                  value={announcementState?.discountBar?.timer?.split('T')[0]}
                  onChange={(e) => {
                    setAnnouncementState((prev) => ({ ...prev, discountBar: { ...prev?.discountBar, timer: e.target.value } }));
                  }}
                  label="Timer"
                  required={false}
                />
              </div>
            </>
            <div className="p-3 border rounded-md w-full">
              <p className="mb-3">Preview</p>
              <DiscountCountdownBar announcement={announcementState?.discountBar} />
            </div>
            <div className="mt-2 ml-auto">
              <Button label="Save" action={() => handleSave('discountBar')} size="small" loading={loading?.discountBar} active={buttonActive?.discountBar} />
            </div>
          </div>
        ) : (
          <CardLoader />
        )}
      </CustomCard>

      <CustomCard
        title="Popup Modal"
        className="w-full"
        actions={
          announcementState.popup.discountRef ? (
            <button onClick={() => handleRemoveDiscount('popup')} className="flex items-center gap-1 whitespace-nowrap text-red-500">
              Remove Discount
            </button>
          ) : (
            <button
              onClick={() => {
                setModalOpen(true);
              }}
              className="flex items-center gap-1 whitespace-nowrap text-primaryC"
            >
              <GoPlus /> Connect Discount
            </button>
          )
        }
      >
        {!storeConfigurationLoading ? (
          <div className="flex flex-col items-start w-full gap-4">
            <div className="flex justify-between w-full items-center mb-4 flex-row-reverse gap-4">
              <ToggleSwitch
                label="Is Active"
                checked={announcementState.popup.isActive}
                setChecked={(val) =>
                  setAnnouncementState((prev) => ({
                    ...prev,
                    popup: { ...prev.popup, isActive: val },
                  }))
                }
              />
              <RadioButton
                label="When to show this popup"
                options={['reload', 'firstVisit']}
                selectedOption={announcementState.popup.showType}
                setSelectedOption={(val) =>
                  setAnnouncementState((prev) => ({
                    ...prev,
                    popup: { ...prev.popup, showType: val },
                  }))
                }
                className="flex gap-4 items-center !space-y-0"
              />
            </div>

            <div className="p-3 border rounded-md w-full ">
              <p className="mb-3">Preview</p>
              <DiscountPopup isOpen={true} discountRef={announcementState?.popup?.discountRef} />
            </div>
            <div className="mt-2 ml-auto">
              <Button label="Save" action={() => handleSave('popup')} size="small" loading={loading?.popup} active={buttonActive?.popup} />
            </div>
          </div>
        ) : (
          <CardLoader />
        )}
      </CustomCard>

      {/* Select Discount Modal */}
      <Modal isOpen={modalOpen} className="!max-w-[500px]">
        <ActionCard
          label="Select Discount"
          subText="Select discount you want to associate"
          actions={
            <>
              <Button
                label="Cancel"
                action={() => {
                  setModalOpen(false);
                  setSelectedDiscount(null);
                }}
                variant="white"
                size="small"
              />
              <Button label="Done" action={handleDone} size="small" disabled={!selectedDiscount} />
            </>
          }
        >
          <RadioButton
            options={discounts?.map((d) => ({ label: d?.name, value: d?._id }))}
            selectedOption={selectedDiscount?._id}
            setSelectedOption={(val) => {
              console.log('val==>', val);
              const found = discounts.find((d) => d?._id === val);
              console.log('found==>', found);
              setSelectedDiscount(found);
            }}
          />
        </ActionCard>
      </Modal>
    </BackgroundFrame>
  );
};

export default Discount;
