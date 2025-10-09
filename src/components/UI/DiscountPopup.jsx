import { useEffect, useState } from 'react';
import FormInput from '../Forms/FormInput';
import Modal from '../Modals/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addSubscriber } from '@/APIs/Customer/Subscriber';
import Button from '../Actions/Button';

const DiscountPopup = ({ discountRef, isOpen, setIsOpen, position = 'absolute' }) => {
  const [email, setEmail] = useState('');
  const { discounts, announcements } = useSelector((state) => state?.storeConfiguration?.storeConfiguration);
  const [discount, setDiscount] = useState({});
  const [loading, setLoading] = useState(false);
  const { store } = useSelector((state) => state.store);

  useEffect(() => {
    if (discounts && discounts?.length > 0) {
      const newDiscount = discounts.find((d) => d?._id === announcements?.popup?.discountRef);
      setDiscount(newDiscount);
    }
  }, [discounts, announcements]);

  // Guard clause: check for open, discount presence, active status, and expiry
  const isValidDiscount = isOpen && discount && discount?.isActive && new Date(discount?.expiryDate) > new Date();

  if (!isValidDiscount) return;

  const isPercent = discount.amountType === 'percent';
  const isCoupon = discount.discountType === 'coupon';
  const isSubscriptionOnly = discount.access === 'subscription';

  const handleSubscribe = async (e) => {
    setLoading(true);
    if (e) e.preventDefault();
    if (!email) {
      return toast.error('Email is required!');
    }
    await addSubscriber(store?._id, email);
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} position={position} className={'!max-w-[500px]'}>
      <div className="p-6 w-full flex flex-col items-center relative">
        <p className="text-[22px] text-textC font-medium mb-8 text-center">Special Discount!</p>

        <p className="italic text-[14px]">WE'RE Giving You</p>

        <p className="text-[60px] font-[serif]">{isPercent ? `${discount.amount}% OFF` : `Rs ${discount.amount} OFF`}</p>

        <div className="w-[150px] border-red-600 border-t-2 mb-4" />

        {isCoupon && (
          <p className="mb-2 text-center text-[16px]">
            Use code: <strong className="text-red-600">{discount.name}</strong>
          </p>
        )}

        {isSubscriptionOnly ? (
          <div className="w-full mt-4">
            <form onSubmit={(e) => handleSubscribe(e)}>
              <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
              <Button type="submit" size="" label="Subscribe" variant="store" className="mt-4 w-full !py-2 rounded-md" loading={loading} />
            </form>
          </div>
        ) : (
          <div className="flex justify-center mt-6">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow">Got it!</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DiscountPopup;
