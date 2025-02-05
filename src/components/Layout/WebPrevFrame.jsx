"use client";

import React from 'react'
import Header from '../TemplateComponents/layout/header';
import Hero from '../TemplateComponents/sections/hero';
import Button from '../Actions/Button';
import { useRouter } from 'next/navigation';
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import { useSelector } from 'react-redux';
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';


const WebPrevFrame = () => {
    const router = useRouter()
    const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
    const { siteName } = useSelector((state) => state.siteName);


    return (
        <div className='pb-[40px]'>

            <div className='flex w-full justify-center gap-[25px]'>
                <div className="h-[320px] w-[650px] overflow-hidden">
                    <div className="LaptopFrame">
                        <Header />
                        <Hero />
                    </div>
                </div>
                <div className="h-[320px] w-[220px] overflow-hidden relative">
                    <div className="MobileFrame">
                        <Header />
                        <Hero />
                    </div>
                    <div className="MobileFrameCover">
                    </div>
                </div>
            </div>
            <div>
                <div className='w-full flex justify-between items-center py-[20px] px-[20px] bg-backgroundC shadow-md'>
                    <div className='flex gap-2'>
                        <div className='w-[100px] h-[100px] flex justify-center items-center bg-secondaryC p-2'>
                            <img src={SiteLogo?.image} alt="Site Logo" className='object-contain' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='bg-secondaryC flex gap-1 justify-center items-center text-primaryC text-center text-sm w-max px-[13px] rounded-2xl' >
                                <GoDotFill />
                                live
                            </p>
                            <p className='text-textC'>{siteName} </p>
                            <Link className='text-blue-400 flex gap-1 items-center ' href={`https://stores-admin-panel.vercel.app/${siteName} `}>stores-admin-panel.vercel.app/{siteName} <FiArrowUpRight /></Link>
                        </div>
                    </div>
                    <div>

                        <Button
                            label='Customize'
                            action={() => router.push('/content')}
                            className='!w-[200px] !bg-black'
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default WebPrevFrame;