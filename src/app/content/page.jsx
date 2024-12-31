"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import FaqUploader from '@/components/UI/FaqUploader';
import ImageUploader from '@/components/UI/ImageUploader';
import dynamic from 'next/dynamic';
import React from 'react'

const TextEditor = dynamic(() => import('@/components/UI/TextEditor'), { ssr: false });


const pages = [
    {
        title: 'About Us',
        image: 'https://img.icons8.com/color/48/about.png',
    },
    {
        title: 'FAQs',
        image: 'https://img.icons8.com/office/40/ask-question.png',
    },
    {
        title: 'Contact Details',
        image: 'https://img.icons8.com/color/48/add-contact-to-company.png',
    },
    {
        title: 'Terms And Condition',
        image: 'https://img.icons8.com/color/48/terms-and-conditions.png',
    },
    {
        title: 'Privacy Policy',
        image: 'https://img.icons8.com/color/48/privacy-policy.png',
    },
]

const Content = () => {
    return (
        <div className='min-h-full bg-[#fefefe] flex justify-center items-center'>
            <div  className='w-full px-[20px] py-[20px] bg-white rounded-md'>
                <ImageUploader/>
                <TextEditor/>
                <FaqUploader/>
                {pages.map((item, index) => {
                    return (
                        <div key={index} className='flex py-[15px] border-[#b7b7b780]  border-b'>
                            <div className='flex gap-[15px] items-start'>
                                <div className='w-[50px] h-[50px] bg-[#f5f5f5] rounded-full flex justify-center items-center'>
                                    <img src={item.image} alt={item.title} className='w-[70%] h-[70%]' />
                                </div>
                                <div className='py-[4px] flex flex-col gap-[4px]'>
                                    <h2 className='text-[17px] font-medium text-[#161616] font-[poppins]'>{item.title}</h2>
                                    <h2 className='text-[13px] font-semibold cursor-pointer text-[#3888be]'>Edit</h2>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProtectedRoute(Content)