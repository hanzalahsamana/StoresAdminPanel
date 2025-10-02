'use client';

import React, { useState } from 'react';
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

const defaultDiscount = {
  name: 'NEWYEAR2025',
  discountType: 'global',
  access: 'all',
  amountType: 'percent',
  amount: 25,
  isActive: true,
  expiryDate: '2027-10-09T09:49:00.000+00:00',
};

const Discount = () => {
  const { discounts } = useSelector((state) => state?.storeDetail?.storeDetail);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const [announcementState, setAnnouncementState] = useState({
    bar: {
      discount: null,
      showForm: false,
      isActive: true,
      saved: false,
    },
    popup: {
      discount: null,
      showForm: false,
      isActive: true,
      showType: 'reload',
      saved: false,
    },
  });

  const handleDone = () => {
    if (selectedDiscount && target) {
      setAnnouncementState((prev) => ({
        ...prev,
        [target]: {
          ...prev[target],
          discount: selectedDiscount,
          showForm: true,
          saved: false,
        },
      }));
      setModalOpen(false);
      setSelectedDiscount(null);
    }
  };

  const handleSave = (type) => {
    const data = announcementState[type];
    const payload = {
      announcementType: type,
      discountId: data.discount?.id,
      isActive: data.isActive,
      ...(type === 'popup' && { showType: data.showType }),
    };

    setAnnouncementState((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        showForm: false,
        saved: true,
      },
    }));
  };

  const handleEdit = (type) => {
    setAnnouncementState((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        showForm: true,
      },
    }));
  };

  const handleRemoveDiscount = (type) => {
    setAnnouncementState((prev) => ({
      ...prev,
      [type]: {
        discount: null,
        showForm: false,
        isActive: true,
        showType: 'reload',
        saved: false,
      },
    }));
  };

  const renderSummary = (type) => {
    const data = announcementState[type];
    return (
      <div className="mt-2 text-sm">
        <p>
          <strong>Active:</strong> {data.isActive ? 'Yes' : 'No'}
        </p>
        {type === 'popup' && (
          <p>
            <strong>Show On:</strong> {data.showType}
          </p>
        )}
        <div className="mt-2">
          <Button label="Edit" action={() => handleEdit(type)} size="small" />
        </div>
      </div>
    );
  };

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

      <CustomCard
        title="Discount Bar"
        className="w-full"
        actions={
          announcementState.bar.discount ? (
            <button onClick={() => handleRemoveDiscount('bar')} className="flex items-center gap-1 whitespace-nowrap text-red-500">
              Remove Discount
            </button>
          ) : (
            <button
              onClick={() => {
                setTarget('bar');
                setModalOpen(true);
              }}
              className="flex items-center gap-1 whitespace-nowrap text-primaryC"
            >
              <GoPlus /> Connect Discount
            </button>
          )
        }
      >
        {!announcementState.bar?.discount || (announcementState.bar.discount.isActive && new Date(announcementState.bar.discount.expiryDate) > new Date()) ? (
          <>
            <div className="p-3 border rounded-md w-full">
              <p className="mb-3">Preview</p>
              <DiscountCountdownBar discount={announcementState.bar.discount || defaultDiscount} />
            </div>

            {announcementState.bar.showForm ? (
              <>
                <ToggleSwitch
                  label="Is Active"
                  checked={announcementState.bar.isActive}
                  setChecked={(val) =>
                    setAnnouncementState((prev) => ({
                      ...prev,
                      bar: { ...prev.bar, isActive: val },
                    }))
                  }
                />
                <div className="mt-2">
                  <Button label="Save" action={() => handleSave('bar')} size="small" />
                </div>
              </>
            ) : (
              announcementState.bar.saved && renderSummary('bar')
            )}
          </>
        ) : (
          <p className="text-textTC italic text-center">Discount is InActive or Expired</p>
        )}
      </CustomCard>

      <CustomCard
        title="Popup Modal"
        className="w-full"
        actions={
          announcementState.popup.discount ? (
            <button onClick={() => handleRemoveDiscount('popup')} className="flex items-center gap-1 whitespace-nowrap text-red-500">
              Remove Discount
            </button>
          ) : (
            <button
              onClick={() => {
                setTarget('popup');
                setModalOpen(true);
              }}
              className="flex items-center gap-1 whitespace-nowrap text-primaryC"
            >
              <GoPlus /> Connect Discount
            </button>
          )
        }
      >
        {!announcementState.popup?.discount || (announcementState.popup.discount.isActive && new Date(announcementState.popup.discount.expiryDate) > new Date()) ? (
          <div className="flex flex-col items-start w-full">
            {announcementState.popup.showForm ? (
              <>
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
                />
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
                <div className="mt-2">
                  <Button label="Save" action={() => handleSave('popup')} size="small" />
                </div>
              </>
            ) : (
              announcementState.popup.saved && renderSummary('popup')
            )}

            <div className="p-3 border rounded-md w-full ">
              <p className="mb-3">Preview</p>
              <DiscountPopup isOpen={true} discount={announcementState.popup.discount || defaultDiscount} />
            </div>
          </div>
        ) : (
          <p className="text-textTC italic text-center">Discount is InActive or Expired</p>
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
            options={discounts?.map((d) => d.name)}
            selectedOption={selectedDiscount?.name}
            setSelectedOption={(val) => {
              const found = discounts.find((d) => d.name === val);
              setSelectedDiscount(found);
            }}
          />
        </ActionCard>
      </Modal>
    </BackgroundFrame>
  );
};

export default Discount;
