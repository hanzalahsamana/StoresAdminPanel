import Button from '@/components/Actions/Button'
import IconButton from '@/components/Actions/IconButton'
import ImgToIcon from '@/components/Actions/ImgToIcon'
import ActionCard from '@/components/Cards/ActionCard'
import CustomCard from '@/components/Cards/CustomCard'
import FormInput from '@/components/Forms/FormInput'
import BackgroundFrame from '@/components/Layout/BackgroundFrame'
import Header from '@/components/Layout/Header'
import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdEdit } from 'react-icons/md'

const page = () => {
    return (
        <div className='h-screen'>
            <div className='h-[60px] bg-white border-b shadow-sm'></div>
            <BackgroundFrame className='bg-lbgC items-center justify-center'>
                <ActionCard
                    label={'Profile'}
                    subText={'You can Manage your account here.'}
                    icon={<ImgToIcon cl url={'https://img.icons8.com/fluency/48/user-male-circle--v1.png'} />}
                // className={'max-w-4xl'}
                >
                </ActionCard>
                <ActionCard
                    label={'General Info'}
                    subText={'You can Manage your account here.'}
                    icon={<ImgToIcon cl url={'https://img.icons8.com/fluency/48/edit-user-male.png'} className={'!containerw-[20px]'} />}
                // className={'max-w-4xl'}
                >
                </ActionCard>
                <div className='grid grid-cols-2 gap-4 w-full '>

                    <CustomCard
                        title={'General'}
                        actions={<>
                            <IconButton icon={<MdEdit />} className={'text-primaryC'} />
                        </>}
                    >

                        <FormInput
                            value={'Junaid'}
                            label='First Name'
                        />
                        <FormInput
                            value={'Hunani'}
                            label='Last Name'
                        />
                    </CustomCard>
                    <CustomCard
                        title={'Last Name'}
                        actions={<>
                            <IconButton icon={<CiEdit />} className={'text-primaryC'} />
                        </>}
                    >

                    </CustomCard>
                    <CustomCard
                        title={'Email'}
                        actions={<>
                            <IconButton icon={<CiEdit />} className={'text-primaryC'} />
                        </>}
                    >

                        <FormInput
                            value={'abc@gmail.com'}
                        />
                        <Button
                            label='Change Email'
                            size='small'
                        />
                    </CustomCard>
                    <CustomCard
                        title={'First Name'}
                        actions={<>
                            <IconButton icon={<CiEdit />} className={'text-primaryC'} />
                        </>}
                    >

                        <FormInput
                            value={'Junaid'}
                        />
                    </CustomCard>

                </div>
            </BackgroundFrame >
        </div >
    )
}

export default page