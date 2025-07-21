"use client";

import FormInput from '@/components/Forms/FormInput'
import React, { useState } from 'react'
import { IoEyedropOutline } from 'react-icons/io5'

const Profile = () => {
    const [value, setValue] = useState('')
    return (
        <div className='h-screen w-screen flex justify-center items-center p-11'>
            <FormInput
                onChange={(e) => setValue(e.target.value)}
                name={'value'}
                value={value}
                size='small'
                className='!w-max'

            />
        </div>
    )
}

export default Profile