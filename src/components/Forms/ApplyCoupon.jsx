'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TemplateFormInput from './TemplateFormInput';
import { applyCoupon } from '@/APIs/StoreDetails/discount';
import { CgSpinner } from 'react-icons/cg';

const ApplyCoupon = ({ totalProductCost = 0, email, setCouponDiscount }) => {
    const [couponCode, setCouponCode] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { siteName } = useSelector((state) => state.siteName);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!couponCode) {
            setMessage('Please enter a coupon code.');
            return;
        }
        try {
            setLoading(true)
            const {discount} = await applyCoupon(siteName, { totalAmount: totalProductCost, email, couponCode })
            setCouponDiscount(discount)
            setMessage("Coupon applied successfully")
        } catch (error) {
            setMessage(error.response ? error.response.data.message : error.message)
        } finally {
            setLoading(false)
        }

    };

    return (
        <form onSubmit={handleApply} className="flex flex-col gap-2 mt-[20px]">
            <div className="flex items-end gap-3">
                <TemplateFormInput
                    type="text"
                    placeholder="Coupon Code"
                    name="coupon"
                    size="large"
                    value={couponCode}
                    handleChange={(e) => setCouponCode(e.target.value)}
                    className='!bg-[var(--tmp-pri)]'
                    labelClassname='bg-[var(--tmp-pri)]'
                    autocomplete='off'
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`!w-[190px] h-[43px] rounded-md px-[20px] bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
                >
                    {loading ? (
                        <CgSpinner className="text-[22px] animate-spin" />
                    ) : (
                        "Apply Coupon"
                    )}
                </button>
            </div>
            {message && (
                <p className="text-[12px] mt-[-5px] text-red-500">{message}</p>
            )}
        </form>
    );
};

export default ApplyCoupon;
