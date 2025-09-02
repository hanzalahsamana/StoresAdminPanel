'use client';

import React, { useState } from 'react';
import Button from '@/components/Actions/Button';
import ActionCard from '@/components/Cards/ActionCard';
import ImgToIcon from '@/components/Actions/ImgToIcon';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import ImageSelector from '@/components/Uploaders/ImageSlector';
import { updateSubscription } from '@/APIs/Subscription/updateSubscription';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import CustomCard from '@/components/Cards/CustomCard';

const Subscription = () => {
  const [screenshot, setScreenshot] = useState(null);
  const { store_id } = useParams();
  const { currUser } = useSelector((state) => state.currentUser);
  const [loading, setLoading] = useState(false);
  const handleNext = async () => {
    setLoading(true);
    if (!screenshot) {
      toast.error('Screenshot is required!');
      setLoading(false);
      return;
    }
    await updateSubscription({ imageUrl: screenshot, amount: 1000, status: 'pending' }, store_id, currUser?.token);
    setLoading(false);
  };

  return (
    <BackgroundFrame className="h-[calc(100vh-60px)]">
      <ActionCard
        className={'h-full'}
        label={'Payment'}
        icon={<ImgToIcon url={'https://img.icons8.com/color/48/bank-card-back-side.png'} />}
        subText={'Manage your subscription here.'}
        actions={
          <>
            <Button
              label="Next"
              size="small"
              action={() => {
                handleNext();
              }}
              className="w-max !py-2"
              loading={loading}
            />
          </>
        }
      >
        <div className="flex gap-8 w-full h-full">
          <div className={'w-[60%] h-full border-r border-borderC pr-4 overflow-auto'}>
            {/* Subscription Details Card */}
            <CustomCard title="Subscription Details">
              <div className="flex flex-col gap-3 text-textC font-medium text-[15px]">
                <p>
                  <span className="font-semibold">Amount:</span> 1000 PKR
                </p>
                <p>
                  <span className="font-semibold">Note:</span> Please pay the amount and upload the payment screenshot below. Your subscription will be activated once the payment
                  is verified by admin.
                </p>
              </div>
            </CustomCard>

            {/* Bank Account Details Card */}
            <CustomCard title="Bank Account Details" className="mt-4">
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-3 text-textC font-medium text-[15px]">
                  <p>Account Title:</p>
                  <p>Account Number: </p>
                  <p>Bank Name:</p>
                  <p>IBAN:</p>
                </div>
                <div className="flex items-end flex-col gap-3 text-textTC text-[15px]">
                  <p>XYZ Pvt Ltd</p>
                  <p>1234567890</p>
                  <p>Meezan Bank</p>
                  <p>PK00MEZN0000001234567890</p>
                </div>
              </div>
            </CustomCard>
          </div>

          <div className="w-[40%] h-full">
            {/* Screenshot Upload */}
            <div className="mb-8 flex justify-center">
              <ImageSelector multiple={false} image={screenshot} setImage={setScreenshot} size="xlarge" label="Upload Payment Screenshot" />
            </div>

            {/* WhatsApp Instructions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Send Screenshot on WhatsApp</h3>
              <div className="flex items-center justify-between bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                <span className="text-green-700 font-semibold text-lg">+92 300 1234567</span>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </ActionCard>
    </BackgroundFrame>
  );
};

export default Subscription;
