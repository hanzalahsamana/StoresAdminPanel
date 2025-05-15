"use client";

import React, { use, useEffect, useState } from 'react'
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import Button from '@/components/Actions/Button';
import ImgToIcon from '@/components/Actions/ImgToIcon';
import ActionCard from '@/components/Cards/ActionCard';
import CustomCard from '@/components/Cards/CustomCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import AddEditDiscountModal from '@/components/Modals/AddEditDiscountModal';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@/components/Actions/IconButton';
import { MdOutlineEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import StatusCard from '@/components/Cards/StatusCard';
import { deleteDiscount } from '@/APIs/StoreDetails/discount';
import moment from 'moment';
import DiscountCountdownBar from '@/components/UI/DiscountCountdownBar';
import { FaPlus } from 'react-icons/fa';
import { GoPlug, GoPlus } from 'react-icons/go';
import DiscountPopup from '@/components/UI/DiscountPopup';

const Discount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [updatedDiscount, setUpdatedDiscount] = useState(false);
    const { discounts } = useSelector((state) => state?.storeDetail?.storeDetail);
    const dispatch = useDispatch();
    const { currUser } = useSelector((state) => state.currentUser);



    useEffect(() => {
        console.log(discounts?.expiryDate, new Date())
        console.log(new Date(discounts?.expiryDate) <= new Date())
    })

    return (
        <BackgroundFrame>
            <ActionCard
                lable={"Announcement"}
                icon={<ImgToIcon
                    url={'https://img.icons8.com/external-stickers-smashing-stocks/70/external-Sale-Announcement-sale-and-cashback-refund-stickers-smashing-stocks.png'}
                    className={'!w-[50px]'}
                />}
                className="w-full"
                actionPosition='top'
            >
            </ActionCard>

            <CustomCard
                title={'Discount Bar'}
                className="w-full"
                actionPosition='top'
                actions={<div className='flex gap-2 w-full'>
                    <button className='flex items-center gap-1 w-full text-primaryC cursor-pointer whitespace-nowrap font-light'><GoPlus />Connect Discount</button>
                </div>}
            >

                <div className='flex flex-col gap-2  w-full'>
                    <p>Preview</p>
                    <div className='flex justify-between w-full'>
                        <DiscountCountdownBar discount={{
                            name: "NEWYEAR2025",
                            discountType: "global",
                            access: "all",
                            amountType: "percent",
                            amount: 25,
                            isActive: true,
                            expiryDate: '2025-07-09T09:49:00.000+00:00', // 3 hours from now
                        }} />
                    </div>


                </div>
            </CustomCard>
            <CustomCard
                title={'Popup Modal'}
                className="w-full"
                actionPosition='top'
                actions={<div className='flex gap-2 w-full'>
                    <button className='flex items-center gap-1 w-full text-primaryC cursor-pointer whitespace-nowrap font-light'><GoPlus />Connect Discount</button>
                </div>}
            >

                <div className='flex flex-col gap-2  w-full'>
                    <p>Preview</p>
                    <div className='flex justify-between w-full'>
                        <DiscountPopup
                            isOpen={true}
                            discount={{
                                name: "NEWYEAR2025",
                                discountType: "global",
                                access: "all",
                                amountType: "percent",
                                amount: 25,
                                isActive: true,
                                expiryDate: '2027-10-09T09:49:00.000+00:00', // 3 hours from now
                            }} />
                    </div>


                </div>
            </CustomCard>



            <AddEditDiscountModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                updatedDiscount={updatedDiscount}
                setUpdatedDiscount={setUpdatedDiscount}
            />

            {/* <CustomCard ></CustomCard> */}
        </BackgroundFrame>
    )
}

export default ProtectedRoute(Discount);