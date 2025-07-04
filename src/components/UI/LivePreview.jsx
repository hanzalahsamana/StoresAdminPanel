"use client";

import { setMaximized, } from '@/Redux/LivePreview/livePreviewSlice';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { VscOpenPreview } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

const LivePreview = ({ children, extraAction = null }) => {
    const { maximized } = useSelector((state) => state.livePreview);
    const dispatch = useDispatch()

    return (
        <>
            {!maximized && (
                <div
                    data-tooltip-id="buttonTIp"
                    data-tooltip-content='Live Preview'
                    onClick={() => dispatch(setMaximized(!maximized))}
                    className='w-[35px] h-[35px] rounded-full bg-primaryC absolute top-[68px] right-2 flex justify-center items-center text-backgroundC cursor-pointer hover:scale-110 transition-all z-[100] text-[17px] font-extrabold'>
                    <VscOpenPreview />
                </div>
            )}
            <Tooltip id='buttonTIp' className='!text-[10px]' />

            <div className={`origin-top-right bg-backgroundC  pointer-events-auto cursor-move duration-500 transition-all border-[1.4px] overflow-hidden 
            ${maximized ? 'w-[100%]  md:w-[470px] md:min-w-[470px] md:top-0 md:right-0 h-[calc(100vh-60px)] sticky'
                    : 'min-w-[0px] w-[0px] h-[0px] sticky top-[20px] right-3 overflow-hidden'}`}>

                {/* <div className={`w-full h-[30px] text-primaryC cursor-default overflow-hidden flex items-center px-[10px] gap-2 transition-all bg-secondaryC`}>
                    <div className='text-[14px]  flex-1'>
                        Live preview
                    </div>
                    {extraAction && (
                        extraAction
                    )}

                    <div
                        onClick={() => { dispatch(setMaximized(!maximized)) }}
                        className=' cursor-pointer flex items-center justify-center rounded-full w-[25px] h-[25px] mr-[10px] text-[14px] rotate-90'>
                        {maximized ? <IoCloseOutline /> : <IoCloseOutline />}
                    </div>

                </div> */}
                <p className='py-4 text-center text-[20px] font-semibold text-textC'>Live Preview</p>

                <div className={`border glowSpinBox md:w-[1280px] md:scale-[0.32] bg-backgroundC ${maximized ? 'md:w-[1280px] md:scale-[0.32] left-[30px] top-[50px] w-full h-[calc(((100vh-90px)))] md:h-auto md:max-h-[calc(((100vh-100px)/34)*100)] absolute overflow-y-auto' : ''}  origin-top-left `}>
                    <div className='rounded-[25px] overflow-hidden'>
                        {children}
                    </div>
                </div>

            </div>
        </>

    );
};

export default LivePreview;