'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TemplateFormInput from './TemplateFormInput';
import { applyCoupon } from '@/APIs/StoreDetails/discount';
import { CgSpinner } from 'react-icons/cg';
import Button from '../Actions/Button';

const ApplyCoupon = ({ totalProductCost = 0, email = '', setCouponDiscount = () => { } }) => {
    const [couponCode, setCouponCode] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { store } = useSelector((state) => state.store);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!couponCode) {
            setMessage('Please enter a coupon code.');
            return;
        }
        try {
            setLoading(true)
            const { discount } = await applyCoupon(store._id, { totalAmount: totalProductCost, email, couponCode })
            setCouponDiscount(discount)
            setMessage("Coupon applied successfully")
        } catch (error) {
            setMessage(error.response ? error.response.data.message : error.message)
        } finally {
            setLoading(false)
        }

    };

    return (
        <form onSubmit={handleApply} className="flex flex-col gap-2 mt-[10px]">
            <div className="flex items-end gap-3">
                <TemplateFormInput
                    type="text"
                    placeholder="Coupon Code"
                    name="coupon"
                    size="small"
                    value={couponCode}
                    handleChange={(e) => setCouponCode(e.target.value)}
                    className='!bg-[var(--tmp-pri)]'
                    labelClassname='bg-[var(--tmp-pri)]'
                    autocomplete='off'
                />
                <Button
                    type='submit'
                    loading={loading}
                    variant='black'
                    size='small'
                    label='Apply Coupon'
                    className='bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] '
                />
            </div>
            {message && (
                <p className="text-[12px] mt-[-5px] text-red-500">{message}</p>
            )}
        </form>
    );
};

export default ApplyCoupon;