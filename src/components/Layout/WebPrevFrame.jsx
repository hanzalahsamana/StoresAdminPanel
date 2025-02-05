import React from 'react'
import Header from '../TemplateComponents/layout/header';
import Hero from '../TemplateComponents/sections/hero';

const WebPrevFrame = () => {
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
                <div className='w-full h-[100px] bg-secondaryC'>

                </div>
            </div>
        </div>

    )
}

export default WebPrevFrame;