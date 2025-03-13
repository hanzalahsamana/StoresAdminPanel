"use client";

import React from 'react'
import Header from './TemplateHeader';
import Hero from '../Widgets/hero';
import { useRouter } from 'next/navigation';
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import { useSelector } from 'react-redux';
import CollectionSection from '../Widgets/collectionSection';
import FabricsAbout from '../Widgets/fabricsAbout';
import ProductsSection from '../Widgets/productsSection';
import CollectionAbout from '../Widgets/collectionAbout';



const WebPrevFrame = () => {



    return (
        <div className='w-full overflow-x-auto customScroll'>

            <div className='flex w-full min-w-[950px] overflow-auto justify-center gap-[25px]'>
                <div className="h-[320px] w-[650px] overflow-hidden relative">
                    <div className="LaptopFrame no-scrollbar">
                        <Header />
                        <Hero />
                        <FabricsAbout />
                        <CollectionAbout />
                    </div>
                    <div className="LaptopFrameCover no-scrollbar">
                    </div>
                </div>
                <div className="h-[320px] w-[220px] overflow-hidden relative rounded-[25px_25px_0px_0px]">
                    <div className="MobileFrame no-scrollbar">
                        <Header />
                        <Hero />
                    </div>
                    <div className="MobileFrameCover no-scrollbar">
                    </div>
                </div>
            </div>

        </div>

    )
}

export default WebPrevFrame;