import React, { useState, useRef, useEffect } from 'react';
import { CgMaximize, CgMinimize } from 'react-icons/cg';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import ActionCard from '../Cards/ActionCard';

const LivePreview = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [alwaysExtend, setAlwaysExtend] = useState(false);
    const [maximized, setMaximized] = useState(false);

    return maximized ? (
        <ActionCard lable={'Live Preview'}>
            <LivePreviewContent
                children={children}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                alwaysExtend={alwaysExtend}
                setAlwaysExtend={setAlwaysExtend}
                maximized={maximized}
                setMaximized={setMaximized}
            />
        </ActionCard>
    ) : (
        <LivePreviewContent
            children={children}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            alwaysExtend={alwaysExtend}
            setAlwaysExtend={setAlwaysExtend}
            maximized={maximized}
            setMaximized={setMaximized}
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
    setMaximized
}) => {
    const containerRef = useRef(null);
    const [position, setPosition] = useState({ x: window.innerWidth - 370, y: window.innerHeight - 280 });
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
        const containerWidth = containerRef.current?.offsetWidth || 360;
        const containerHeight = containerRef.current?.offsetHeight || 270;

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
            className={`  ${maximized ? 'relative' : `fixed flex w-[360px] h-[270px]  ${transformOrigin}`} z-50`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves window
        >
            {console.log(position, "qwerty")}

            <Tooltip id='preview' className='!text-[10px]' />
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={handleMouseDown}
                className={`${maximized ? 'w-full h-full' : isHovered || alwaysExtend ? 'w-[360px] h-[270px]' : 'w-[180px] h-[120px]'} bg-backgroundC cursor-move transition-all border-[1.4px] border-[#000000d1] shadow-xl relative overflow-hidden`}
                style={{ transformOrigin }}
            >

                {/* Top Controls */}
                <div className={`w-full ${isHovered || alwaysExtend || maximized ? 'h-[30px]' : 'h-0'} cursor-default overflow-hidden flex items-center px-[10px] gap-2 transition-all bg-[#000000d1]`}>
                    <div className='text-[14px] text-backgroundC flex-1'>
                        Live preview
                    </div>
                    {/* Maximize Button */}
                    {!maximized && (
                        <div
                            data-tooltip-id="preview"
                            data-tooltip-content={alwaysExtend ? "Toggle Expand" : "Remain Expand"}
                            onClick={() => setAlwaysExtend(!alwaysExtend)}
                            className='text-white cursor-pointer flex items-center justify-center rounded-full w-[25px] h-[25px]  text-[14px] rotate-90'>
                            {alwaysExtend ? <FiMinimize2 /> : <FiMaximize2 />}
                        </div>
                    )}
                    <div
                        data-tooltip-id="preview"
                        data-tooltip-content={maximized ? "Minimize" : "Maximize"}
                        onClick={() => setMaximized(!maximized)}
                        className='text-white cursor-pointer flex items-center justify-center rounded-full w-[25px] h-[25px] mr-[10px] text-[14px] rotate-90'>
                        {maximized ? <CgMinimize /> : <CgMaximize />}
                    </div>

                    {/* Expand Toggle */}

                    {/* Close Button */}
                    {/* <div
                        data-tooltip-id="preview"
                        data-tooltip-content="Close"
                        className='text-white cursor-pointer flex items-center justify-center rounded-full w-[25px] h-[25px] text-[14px]'>
                        <IoClose />
                    </div> */}
                </div>

                {/* Content Preview (scaled version) */}
                <div className={`${maximized ? 'scale-100 w-full h-full' : isHovered || alwaysExtend ? 'scale-[0.3] top-[30px] w-[1200px] h-[800px] absolute' : 'scale-[0.15] top-0 w-[1200px] h-[800px] absolute'} left-0 transition-all overflow-y-auto origin-top-left pointer-events-none no-scrollbar`} >
                    {children}
                </div>
            </div>
        </div>
    );
};
