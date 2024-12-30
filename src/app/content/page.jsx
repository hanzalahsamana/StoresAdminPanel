"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import React from 'react'

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
        <div>
            <div>
                {pages.map((item, index) => {
                    return (
                        <div key={index} className='flex'>
                            <div className='flex gap-[10px] items-center'>
                                <div className='w-[50px] h-[50px] bg-[#d8fff6] rounded-full flex justify-center items-center'>

                                    <img src={item.image} alt={item.title} className='w-[80%] h-[80%]' />
                                </div>
                                <h2>{item.title}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProtectedRoute(Content)