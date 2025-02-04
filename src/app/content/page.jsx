"use client";

import { fetchPagesData } from '@/APIs/PagesData/getPagesData';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import Loader from '@/components/loader';
import CustomModal from '@/components/UI/CustomModal';
import { VedioUploader } from '@/components/UI/VedioUploader';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const TextEditor = dynamic(async() => import('@/components/UI/TextEditor'), { ssr: false });

const pagesIcons = {
    'About Us': 'https://img.icons8.com/color/48/about.png',
    'FAQ': 'https://img.icons8.com/office/40/ask-question.png',
    'Contact': 'https://img.icons8.com/color/48/add-contact-to-company.png',
    'Terms and Conditions': 'https://img.icons8.com/color/48/terms-and-conditions.png',
    'Privacy Policy': 'https://img.icons8.com/color/48/privacy-policy.png',
    'Site Logo': 'https://img.icons8.com/stickers/50/geometry.png',
    'Manufacture Process': 'https://img.icons8.com/3d-fluency/50/chemical-plant.png',
    'Our Quality': 'https://img.icons8.com/3d-fluency/50/guarantee.png',
    'Hero Banner': 'https://img.icons8.com/3d-fluency/50/old-shop.png',
    'Return Policy': 'https://img.icons8.com/color/48/return.png',
    'Shipping Policy': 'https://img.icons8.com/color/48/in-transit--v1.png',
    'Fabric Remants': 'https://img.icons8.com/color/48/polishing-cloth.png',
}

const Content = () => {
    const { currUser } = useSelector((state) => state.currentUser);
    const { pagesData, pagesDataLoading } = useSelector((state) => state.pagesData);
    const [editingPage, setEditingPagee] = useState(null);
    const dispatch = useDispatch()  

    useEffect(() => {
        fetchPagesData(dispatch, currUser?.brandName)
    }, [])
    
    if (pagesDataLoading) {
        return <Loader />
    }
    return (
        <div className='min-h-full  flex justify-center items-center'>
            <div className='w-full px-[20px] py-[20px] rounded-md'>
                {/* <VedioUploader /> */}
                <CustomModal selectedPage={editingPage} setSelectedPage={setEditingPagee} />
                <h1 className='text-[30px]'>Update Pages</h1>
                {pagesData.map((item, index) => (
                    <div key={index} className='flex py-[15px] border-[#b7b7b780]  border-b'>
                        <div className='flex gap-[15px] items-start'>
                            <div className='w-[50px] h-[50px] bg-[#f5f5f5] rounded-full flex justify-center items-center'>
                                <img src={pagesIcons[item.type]} alt={item.type} className='w-[70%] h-[70%]' />
                            </div>
                            <div className='py-[4px] flex flex-col gap-[4px]'>
                                <h2 className='text-[17px] font-medium text-[#161616] font-[poppins]'>{item.type}</h2>
                                <h2 className='text-[13px] font-semibold cursor-pointer text-[#3888be]'
                                    onClick={() => {
                                        setEditingPagee(item);
                                    }}
                                >Edit</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProtectedRoute(Content)