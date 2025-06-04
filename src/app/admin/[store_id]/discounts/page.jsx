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
                label={"Discounts"}
                icon={<ImgToIcon
                    url={'https://img.icons8.com/external-gradient-design-circle/66/external-discounts-activities-gradient-design-circle.png'}
                    className={'!w-[50px]'}
                />}
                className="w-full"
                actionPosition='top'
                actions={<>
                    <Button
                        label={"Add New Discount"}
                        size="small"
                        action={() => setIsOpen(true)}
                    />
                </>
                }
            >
            </ActionCard>

            {discounts?.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4  w-full'>
                    {discounts?.map((discount, index) => (
                        <CustomCard
                            title={`${discount?.discountType === 'global'? 'Name': 'Code'}: ${discount?.name}`}
                            key={index}
                            className="w-full"
                            actionPosition="top"
                            actions={
                                <div className="flex gap-2">
                                    <IconButton
                                        icon={<MdOutlineEdit />}
                                        className="text-blue-500"
                                        action={() => {
                                            setUpdatedDiscount(discount);
                                            setIsOpen(true);
                                        }}
                                    />
                                    <IconButton
                                        icon={<AiOutlineDelete />}
                                        className="text-red-500"
                                        action={() =>
                                            deleteDiscount(discount?._id, currUser?.token, dispatch)
                                        }
                                    />
                                </div>
                            }
                        >
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col gap-3 text-textC font-medium text-[15px]">
                                    {/* <p>Code / Name:</p> */}
                                    <p>Discount Type:</p>
                                    <p>Access By:</p>
                                    <p>Amount Type:</p>
                                    <p>Amount:</p>
                                    <p>Min Order Amount:</p>
                                    <p>Usage Limit:</p>
                                    <p>Usage Per User:</p>
                                    <p>Description:</p>
                                    <p>Expiry Date:</p>
                                    <p>Status:</p>
                                </div>
                                <div className="flex items-end flex-col gap-3 text-textTC text-[15px]">
                                    {/* <p>{discount?.name}</p> */}
                                    <p>{discount?.discountType}</p>
                                    <p>
                                        {discount?.discountType === 'global'
                                            ? 'Not applicable in global'
                                            : discount?.access}
                                    </p>

                                    <p>{discount?.amountType}</p>
                                    <p>{discount?.amountType === "percent" ? `${discount?.amount}%` : `${discount?.amount}Rs`}</p>
                                    <p>{discount?.minOrderAmount || 0}</p>
                                    <p>
                                        {discount?.discountType === 'global'
                                            ? 'Not applicable in global'
                                            : discount?.usageLimit ?? 'Unlimited'}
                                    </p>
                                    <p>
                                        {discount?.discountType === 'global'
                                            ? 'Not applicable in global'
                                            : discount?.usagePerUser ?? 'Unlimited'}
                                    </p>
                                    <p>{discount?.description || 'N/A'}</p>
                                    <p>
                                        {discount?.expiryDate
                                            ? moment(discount?.expiryDate).format("YYYY-MM-DD HH:mm")
                                            : "No Date"}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <StatusCard
                                            label={
                                                new Date(discount?.expiryDate) <= new Date()
                                                    ? "Expired"
                                                    : discount?.isActive
                                                        ? "Active"
                                                        : "Inactive"
                                            }
                                            status={
                                                new Date(discount?.expiryDate) >= new Date() &&
                                                discount?.isActive
                                            }
                                        />
                                    </p>
                                </div>
                            </div>
                        </CustomCard>
                    ))}

                </div>

            ) : (
                <CustomCard>
                    <p className='px-[80px] text-center'>No discounts found</p>
                </CustomCard>
            )}





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