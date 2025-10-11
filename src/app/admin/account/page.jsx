"use client";
import { updateProfile } from '@/APIs/Auth/updateProfile';
import { deleteStore } from '@/APIs/StoreDetails/deleteStore';
import Button from '@/components/Actions/Button'
import IconButton from '@/components/Actions/IconButton'
import ImgToIcon from '@/components/Actions/ImgToIcon'
import ActionCard from '@/components/Cards/ActionCard'
import FormInput from '@/components/Forms/FormInput'
import BackgroundFrame from '@/components/Layout/BackgroundFrame'
import ChangePasswordModal from '@/components/Modals/ChangePasswordModal';
import DeleteAccountModal from '@/components/Modals/DeleteAccountModal';
import Modal from '@/components/Modals/Modal'
import DynamicTable from '@/components/Tables/Table';
import useConfirm from '@/Hooks/useConfirm';
import { setCurrentUser, setLogout } from '@/Redux/Authentication/AuthSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi';
import { IoIosArrowRoundBack, IoIosLock, IoIosMail } from 'react-icons/io'
import { IoArrowBackOutline, IoStorefrontOutline, IoTrashOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Account = () => {

    const [isDelteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)
    const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [profilLoading, setProfilLoading] = useState(null)
    const { allStores, allStoresLoading } = useSelector((state) => state.allStores);
    const { currUser } = useSelector((state) => state.currentUser);
    const { confirm, ConfirmationModal } = useConfirm();
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        setFirstName(currUser?.firstName)
        setLastName(currUser?.lastName)
    }, [currUser])

    const handleDeleteStore = async (storeId) => {
        if (deleteLoading) return;
        try {
            const ok = await confirm('Delete Store', 'Are you sure you want to delete this Store? This will delete your all store data');
            if (!ok) return;
            setDeleteLoading(storeId)
            await deleteStore(currUser?.token, storeId)
        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message);
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleUpdateProfile = async (name, payload) => {
        if (profilLoading) return;
        try {
            setProfilLoading(name)
            const responce = await updateProfile(currUser?.token, payload)
            dispatch(setCurrentUser({ ...currUser, ...responce?.user }));
            toast.success("Updated Succesfully")
        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message);
        } finally {
            setProfilLoading(false)
        }
    }

    return (
        <div className=' w-full flex items-center justify-center !bg-lbgC'>
            <BackgroundFrame className='flex !flex-row justify-start flex-wrap gap-5 md:!gap-0 p-6'>
                <div className="w-full pb-5">
                    <ActionCard
                        label={'Manage Account'}
                        subText={'You can Manage your account here.'}
                        icon={<ImgToIcon url={'https://img.icons8.com/fluency/96/guest-male.png'} />}
                        className="break-inside-avoid flex-none !p-4 pt-3"
                        actionPosition='top'
                        actions={<Button action={() => router.push('/admin/stores')} label='Go Back' icon={<IoArrowBackOutline />} iconPosition='left' size='small' variant='black' />}

                    />
                </div>
                <div className="w-full md:w-3/5 space-y-5 pr-3">
                    <ActionCard
                        label={'General Info'}
                        subText={'You can Manage your account here.'}
                        icon={<ImgToIcon url={'https://img.icons8.com/fluency/48/info.png'} />}
                        className="break-inside-avoid flex-none !p-4 pt-3"
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
                            <FormInput
                                size='small'
                                label='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                suffix={<Button variant='black' size='small' label='save' loading={profilLoading === "firstName"} action={() => handleUpdateProfile("firstName", { firstName })} className='!shadow-none rounded-l-none' />}
                            />
                            <FormInput
                                size='small'
                                label='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                suffix={<Button variant='black' size='small' label='save' loading={profilLoading === "lastName"} action={() => handleUpdateProfile("lastName", { lastName })} className='!shadow-none rounded-l-none' />}
                            />
                        </div>
                    </ActionCard>
                    <ActionCard
                        label={'Stores'}
                        subText={'You can Manage your account here.'}
                        icon={<ImgToIcon url={'https://img.icons8.com/matisse/100/shop.png'} />}
                        actionPosition='top'
                        actions={<Button action={() => router.push('/admin/stores')} label='Create Store' icon={<FiExternalLink />} iconPosition='right' size='small' variant='black' />}
                        className="break-inside-avoid flex-none !p-4 pt-3"
                    >
                        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto customScroll  border border-borderC  rounded-lg rounded-l">
                            {allStores?.map((store, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between px-4 py-2 pr-2 border-b border-borderC   bg-backgroundC "
                                >
                                    {/* Store Name */}
                                    <div className='flex gap-2 items-center'>
                                        <IoStorefrontOutline />
                                        <p className="font-medium text-textC">{store.storeName}</p>
                                    </div>

                                    <Button action={() => handleDeleteStore(store?._id)} label={deleteLoading === 'store?._id' ? 'Deleting Store' : 'Delete Store'} variant='text' size='small' className='text-red-500 font-semibold' ></Button>
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
                            <div onClick={() => setIsPasswordChangeModalOpen(true)} className='py-5 md:py-3 px-4 border rounded-md flex justify-start items-center gap-2 bg-gray-0 select-none active:bg-gray-100 hover:bg-gray-100 cursor-pointer transition-all text-gray-600'>
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
                            label='Logout'
                            variant='white'
                            className='!text-red-600'
                            action={() => dispatch(setLogout())}

                        />
                        <Button
                            label='Delete Your Account'
                            variant='danger'
                            action={() => setIsDeleteAccountModalOpen(true)}

                        />
                    </ActionCard>
                </div>

            </BackgroundFrame >

            <DeleteAccountModal
                isOpen={isDelteAccountModalOpen}
                setIsOpen={setIsDeleteAccountModalOpen}
            />
            <ChangePasswordModal
                isOpen={isPasswordChangeModalOpen}
                setIsOpen={setIsPasswordChangeModalOpen}
            />
            {ConfirmationModal}

        </div >
    )
}

export default Account