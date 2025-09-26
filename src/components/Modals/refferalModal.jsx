'use client';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { toast } from 'react-toastify';
import IconButton from '../Actions/IconButton';
import { IoCopyOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { updateReferralModal } from '@/APIs/ReferralModal/updateReferralModalShown';
import { useParams } from 'next/navigation';

const ReferralModal = ({ isOpen, setIsOpen }) => {
  const promoCode = "You don't have promo code";
  const { store } = useSelector((state) => state.store);
  const { currUser } = useSelector((state) => state.currentUser);
  const { store_id } = useParams();
  const dispatch = useDispatch();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(store?.promoCode);
    toast.success('Promo Code copied!');
  };

  useEffect(() => {
    const updateReferralModalShown = async () => {
      await updateReferralModal(store_id, store?.subscriptionId?._id, dispatch, currUser?.token);
    };
    if (store?.subscriptionId?.referralModalShown) {
      setIsOpen(true);
      updateReferralModalShown();
    }
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-8 bg-white rounded-2xl shadow-xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Referral Program</h2>
          <p className="text-gray-500 text-sm">Earn free subscription months by inviting your friends!</p>
        </div>

        {/* Rules / Info */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <img src="https://img.icons8.com/color/48/000000/checkmark.png" className="w-5 h-5" />
            <span>
              Share your <span className="font-semibold">promo code</span> with friends.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://img.icons8.com/color/48/000000/checkmark.png" className="w-5 h-5" />
            <span>
              Your friend must <span className="font-semibold">sign up</span> and <span className="font-semibold">purchase a subscription</span>.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://img.icons8.com/color/48/000000/cancel.png" className="w-5 h-5" />
            <span>
              Sharing the code alone will <span className="font-semibold">not</span> earn rewards.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://img.icons8.com/color/48/000000/star--v1.png" className="w-5 h-5" />
            <span>
              Invite <span className="font-semibold">5 friends</span> → <span className="font-semibold text-green-600">1 Month Free</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://img.icons8.com/color/48/000000/star--v1.png" className="w-5 h-5" />
            <span>
              Invite <span className="font-semibold">10 friends</span> → <span className="font-semibold text-green-600">2 Months Free</span>
            </span>
          </div>
        </div>

        {/* Promo Code Section */}
        {store?.promoCode ? (
          <div className="text-center space-y-3">
            <p className="text-gray-500">Copy Your Promo Code:</p>
            <div className="flex justify-center items-center gap-2">
              {store?.promoCode}
              <IconButton icon={<IoCopyOutline />} className="text-primaryC !text-[16px]" action={() => copyToClipboard()} />
            </div>
          </div>
        ) : (
          <p className="text-center">{promoCode}</p>
        )}
      </div>
    </Modal>
  );
};

export default ReferralModal;
