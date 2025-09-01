"use client";
import Button from '@/components/Actions/Button'
import IconButton from '@/components/Actions/IconButton'
import ImgToIcon from '@/components/Actions/ImgToIcon'
import ActionCard from '@/components/Cards/ActionCard'
import FormInput from '@/components/Forms/FormInput'
import BackgroundFrame from '@/components/Layout/BackgroundFrame'
import AccountEditModal from '@/components/Modals/AccountEditModal';
import Modal from '@/components/Modals/Modal'
import React, { useState } from 'react'
import { IoIosLock, IoIosMail } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'

const Account = () => {

    const [isModalOpen, setIsModalOpen] = useState(true)
    const [editingField, setEditingField] = useState(null)
    return (
        <div className='h w-full flex items-center justify-center !bg-lbgC'>
            <BackgroundFrame className=' items-center justify-center md:!p-8 gap-6'>

                <ActionCard
                    label={'General Info'}
                    subText={'You can Manage your account here.'}
                    icon={<ImgToIcon url={'https://img.icons8.com/fluency/96/guest-male.png'} />}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
                        <FormInput
                            size='small'
                            value={'Junaid'}
                            label='First Name'
                            suffix={<IconButton icon={<MdEdit />} action={()=>{setIsModalOpen(true);setEditingField('firstName')}} />}
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
                    label={'Security'}
                    subText={'You can Manage your account here.'}
                    icon={<ImgToIcon url={'https://img.icons8.com/fluency/96/keyhole-shield.png'} />}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
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
                >
                    <Button
                        label='Delete Your Account'
                        variant='danger'
                    />
                </ActionCard>

            </BackgroundFrame >

            <AccountEditModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />

        </div >
    )
}

export default Account