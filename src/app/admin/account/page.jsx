"use client";
import Button from '@/components/Actions/Button'
import IconButton from '@/components/Actions/IconButton'
import ImgToIcon from '@/components/Actions/ImgToIcon'
import ActionCard from '@/components/Cards/ActionCard'
import FormInput from '@/components/Forms/FormInput'
import BackgroundFrame from '@/components/Layout/BackgroundFrame'
import AccountEditModal from '@/components/Modals/AccountEditModal';
import Modal from '@/components/Modals/Modal'
import DynamicTable from '@/components/Tables/Table';
import React, { useState } from 'react'
import { IoIosLock, IoIosMail } from 'react-icons/io'
import { IoStorefrontOutline, IoTrashOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux';

const Account = () => {

    const [isModalOpen, setIsModalOpen] = useState(true)
    const [editingField, setEditingField] = useState(null)
    const { allStores, allStoresLoading } = useSelector((state) => state.allStores);

    return (
        <div className=' w-full flex items-center justify-center !bg-lbgC'>
            <BackgroundFrame className='flex !flex-row justify-start flex-wrap gap-5 md:!gap-0 p-6'>
                <div className="w-full md:w-3/5 space-y-5 pr-3">
                    <ActionCard
                        label={'General Info'}
                        subText={'You can Manage your account here.'}
                        icon={<ImgToIcon url={'https://img.icons8.com/fluency/96/guest-male.png'} />}
                        className="break-inside-avoid flex-none !p-4 pt-3"
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
                            <FormInput
                                size='small'
                                value={'Junaid'}
                                label='First Name'
                                suffix={<IconButton icon={<MdEdit />} action={() => { setIsModalOpen(true); setEditingField('firstName') }} />}
                                disabled
                            />
                            <FormInput
                                size='small'
                                value={'Hunani'}
                                label='Last Name'
                                suffix={<IconButton icon={<MdEdit />} />}
                                disabled

                            />

                        </div>
                    </ActionCard>
                    <ActionCard
                        label={'Stores'}
                        subText={'You can Manage your account here.'}
                        icon={<ImgToIcon url={'https://img.icons8.com/matisse/100/shop.png'} />}
                        className="break-inside-avoid flex-none !p-4 pt-3"
                    >
                        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto customScroll  border border-borderC  rounded-lg rounded-l">
                            {allStores?.map((store, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between px-4 py-2 pr-2 border-b border-borderC   bg-backgroundC shadow-none hover:shadow-md transition-all"
                                >
                                    {/* Store Name */}
                                    <div className='flex gap-2 items-center'>
                                    <IoStorefrontOutline />
                                    <p className="font-medium text-textC">{store.storeName}</p>
                                    </div>

                                    {/* Delete Icon */}
                                    {/* <button
                                        onClick={() => onDelete(store)}
                                        className="p-2 rounded-full hover:bg-[var(--primary-color)]/10 transition-colors"
                                    >
                                        <IoTrashOutline
                                            size={20}
                                            className="text-red-500"
                                        />
                                    </button> */}
                                    <Button label='Delete Store' variant='text' size='small' className='text-red-500 font-semibold' ></Button>
                                </div>
                            ))}
                        </div>
                    </ActionCard>
                </div>
                <div className="w-full md:w-2/5 space-y-5 pl-3">
                    <ActionCard
                        label={'Security'}
                        subText={'You can Manage your account here.'}
                        icon={<ImgToIcon url={'https://img.icons8.com/fluency/96/keyhole-shield.png'} />}
                        className="break-inside-avoid flex-none !p-4 pt-3"
                    >
                        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 w-full '>
                            <div className='py-5 md:py-3 px-4 border rounded-md flex justify-start items-center gap-2  font-bold text-lg text-gray-600'>
                                <IoIosMail className='text-[30px]' /> Email: <p className='text-lg font-medium flex flex-col '>junaidhunani890@gmail.com</p>
                            </div>
                            <div className='py-5 md:py-3 px-4 border rounded-md flex justify-start items-center gap-2 bg-gray-0 select-none active:bg-gray-100 hover:bg-gray-100 cursor-pointer transition-all text-gray-600'>
                                <IoIosLock className='text-[30px]' /> <p className='text-lg font-semibold flex flex-col'>Change Your Passoword</p>
                            </div>
                        </div>
                    </ActionCard>
                    <ActionCard
                        label={'Danger'}
                        subText={'You can Manage your account here.'}
                        icon={<ImgToIcon url={'https://img.icons8.com/fluency/96/high-priority.png'} />}
                        className="break-inside-avoid flex-none !p-4 pt-3"
                    >
                        <Button
                            label='Delete Your Account'
                            variant='danger'
                        />
                    </ActionCard>
                </div>

            </BackgroundFrame >

            <AccountEditModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />

        </div >
    )
}

export default Account