"use client";

import React from 'react'
import TemplateHeader from './TemplateHeader';
import HomeLayout from './HomeLayout';
import TemplateFooter from './TemplateFooter';



const WebPrevFrame = () => {



    return (
        <div className='w-full overflow-x-auto customScroll'>

            <div className='flex w-full min-w-[950px] overflow-auto justify-center gap-[25px]'>
                <div className="h-[320px] w-[650px] overflow-hidden relative">
                    <div className="LaptopFrame no-scrollbar">
                        {/* <TemplateHeader />
                        <HomeLayout />
                        <TemplateFooter /> */}
                        <iframe src="http://hello-world.localhost:3000/"></iframe>
                    </div>
                    <div className="LaptopFrameCover no-scrollbar">
                    </div>
                </div>
                <div className="h-[320px] w-[220px] overflow-hidden relative rounded-[25px_25px_0px_0px]">
                    <div className="MobileFrame no-scrollbar">
                        <iframe src="http://hello-world.localhost:3000/"></iframe>
                    </div>
                    <div className="MobileFrameCover no-scrollbar">
                    </div>
                </div>
            </div>

        </div>

    )
}

export default WebPrevFrame;