'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FormInput from './FormInput';
import moment from 'moment';

const ApplyCoupon = ({ totalProductCost = 0, onDiscountApply }) => {
    const [couponCode, setCouponCode] = useState('');
    const [message, setMessage] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

    const { discounts } = useSelector((state) => state?.storeDetail?.storeDetail || {});

    const handleApply = () => {
        if (!couponCode) {
            setMessage('Please enter a coupon code.');
            return;
        }

        const couponDiscount = discounts?.find(
            d =>
                d.discountType === 'coupon' &&
                d.name?.toLowerCase() === couponCode.trim().toLowerCase()
        );

        if (!couponDiscount) {
            setMessage('Invalid or inactive coupon code.');
            return;
        }

        // Check expiration and active status
        const isExpired = couponDiscount?.expiryDate && moment(couponDiscount.expiryDate).isBefore(moment());
        const isInactive = couponDiscount?.isActive === false;

        if (isExpired || isInactive) {
            setMessage('This coupon is either expired or inactive.');
            return;
        }

        const amountType = couponDiscount.amountType; // 'percentage' or 'fixed'
        const discountValue = couponDiscount.amount;
        const discountType = amountType === 'percentage' ? 'percent' : 'fixed';

        const calculatedDiscountAmount =
            amountType === 'percentage'
                ? (totalProductCost * discountValue) / 100
                : discountValue;

        // Pass to parent
        onDiscountApply({
            discountType,
            amount: discountValue,
            source: couponDiscount.name,
        });

        setDiscountAmount(calculatedDiscountAmount);
        setMessage(`Coupon "${couponDiscount.name}" applied: ${amountType === 'percentage' ? discountValue + '%' : 'Rs ' + discountValue}`);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-end gap-3">
                <FormInput
                    type="text"
                    placeholder="Coupon Code"
                    name="coupon"
                    size="large"
                    value={couponCode}
                    handleChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                    className="!w-[190px] h-[43px] rounded-md px-[20px] bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] transition-all duration-300 hover:scale-105"
                    onClick={handleApply}
                >
                    Apply Coupon
                </button>
            </div>

            {message && (
                <p className="text-sm text-[var(--tmp-txt)]">{message}</p>
            )}

            {discountAmount > 0 && (
                <p className="text-sm text-green-600">
                    Discount: Rs {discountAmount.toFixed(2)}
                </p>
            )}
        </div>
    );
};

export default ApplyCoupon;
