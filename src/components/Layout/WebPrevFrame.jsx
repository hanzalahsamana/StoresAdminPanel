"use client";

import React from 'react'
import Header from '../TemplateComponents/layout/header';
import Hero from '../Widgets/hero';
import { useRouter } from 'next/navigation';
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import { useSelector } from 'react-redux';



const WebPrevFrame = () => {



    return (
        <div className='w-full overflow-x-auto customScroll'>

            <div className='flex w-full min-w-[950px] overflow-auto justify-center gap-[25px]'>
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

        </div>

    )
}

export default WebPrevFrame;