import { setAlwaysExtend, setMaximized } from '@/Redux/LivePreview/livePreviewSlice';
import React, { useState, useRef, useEffect } from 'react';
import { CgMaximize, CgMinimize } from 'react-icons/cg';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { Assistant } from "next/font/google";


const assistant = Assistant({
    subsets: ["latin"],
    weight: ["400", "700"], // Add the font weights you need
  });

const LivePreview = ({ children, extraAction = null }) => {
    const dispatch = useDispatch();
    const { maximized, alwaysExtend } = useSelector((state) => state.livePreview);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <LivePreviewContent
            children={children}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            alwaysExtend={alwaysExtend}
            setAlwaysExtend={(value) => dispatch(setAlwaysExtend(value))}
            maximized={maximized}
            setMaximized={(value) => dispatch(setMaximized(value))}
            extraAction={extraAction}
        />
    );
};

export default LivePreview;

const LivePreviewContent = ({
    children,
    isHovered,
    setIsHovered,
    alwaysExtend,
    setAlwaysExtend,
    maximized,
    setMaximized,
    extraAction = null,
}) => {
    const containerRef = useRef(null);
    const [position, setPosition] = useState({ x: window.innerWidth - 488, y: window.innerHeight - 255 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Handle Mouse Down (Start Dragging)
    const handleMouseDown = (e) => {
        if (maximized) return;
        e.preventDefault(); // Prevents text selection on double-click
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    // Handle Mouse Move (Dragging)
    const handleMouseMove = (e) => {
        if (!dragging) return;

        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        // Prevent going out of screen
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const containerWidth = containerRef.current?.offsetWidth || 488;
        const containerHeight = containerRef.current?.offsetHeight || 255;

        setPosition({
            x: Math.max(0, Math.min(screenWidth - containerWidth, newX)),
            y: Math.max(0, Math.min(screenHeight - containerHeight, newY))
        });
    };

    // Handle Mouse Up (Stop Dragging)
    const handleMouseUp = () => setDragging(false);

    // Determine transform origin based on position
    let transformOrigin = 'justify-start items-start'; // Default
    if (position.x > window.innerWidth / 2 && position.y < window.innerHeight / 2) {
        transformOrigin = 'justify-end items-start';
    } else if (position.x > window.innerWidth / 2 && position.y > window.innerHeight / 2) {
        transformOrigin = 'justify-end items-end';
    } else if (position.x < window.innerWidth / 2 && position.y > window.innerHeight / 2) {
        transformOrigin = 'justify-start items-end';
    }


    const scrollToBottom = () => {
        if (document.body.current) {
            document.body.current.scrollTop = document.body.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom(); // Scrolls to bottom on mount
    }, [maximized]);

    return (
        <div
            ref={containerRef}
            style={{
                left: maximized ? 0 : `${position.x}px`,
                top: maximized ? 0 : `${position.y}px`,
                transition: dragging ? 'none' : 'transform 0.2s ease-out',
            }}
            className={`  ${maximized ? 'sticky top-[60px]' : `fixed flex w-[488px] h-[255px] pointer-events-none  ${transformOrigin}`} z-50`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves window
        >

            <Tooltip id='preview' className='!text-[10px]' />
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={handleMouseDown}
                className={`${maximized ? 'w-[100vw] md:w-[488px] h-[calc(100vh-60px)]' : isHovered || alwaysExtend ? 'w-[488px] h-[255px] shadow-xl' : 'w-[258px] h-[120px] shadow-xl'} bg-backgroundC pointer-events-auto cursor-move transition-all border-[1.4px] border-primaryC  relative overflow-hidden`}
                style={{ transformOrigin }}
            >

                {/* Top Controls */}
                <div className={`w-full ${isHovered || alwaysExtend || maximized ? 'h-[30px]' : 'h-0'} text-primaryC cursor-default overflow-hidden flex items-center px-[10px] gap-2 transition-all bg-secondaryC`}>
                    <div className='text-[14px]  flex-1'>
                        Live preview
                    </div>
                    {extraAction && (
                        extraAction
                    )}
                    {/* Maximize Button */}
                    {!maximized && (
                        <div
                            data-tooltip-id="preview"
                            data-tooltip-content={alwaysExtend ? "Toggle Expand" : "Remain Expand"}
                            onClick={() => setAlwaysExtend(!alwaysExtend)}
                            className=' cursor-pointer flex items-center justify-center rounded-full w-[25px] h-[25px]  text-[14px] rotate-90'>
                            {alwaysExtend ? <FiMinimize2 /> : <FiMaximize2 />}
                        </div>
                    )}
                    <div
                        data-tooltip-id="preview"
                        data-tooltip-content={maximized ? "Minimize" : "Maximize"}
                        onClick={() => { setMaximized(!maximized); setIsHovered(false) }}
                        className='cursor-pointer flex items-center justify-center rounded-full w-[25px] h-[25px] mr-[10px] text-[14px] rotate-90'>
                        {maximized ? <CgMinimize /> : <CgMaximize />}
                    </div>

                </div>

                <div
                    className={`${assistant.className} ${maximized
                        ? 'scale-x-[0.38] scale-y-[0.38] w-[1280px] h-[calc(((100vh-62px)/38)*100)]'
                        : isHovered || alwaysExtend
                            ? 'scale-[0.38] top-[30px] w-[1280px] h-[600px] absolute'
                            : 'scale-[0.2] top-0 w-[1280px] h-[600px] absolute'
                        } left-0 transition-all overflow-y-auto origin-top-left `}
                >
                    {children}
                </div>

            </div>
        </div>
    );
};
