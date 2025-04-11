"use client";
import React, { useEffect, useState } from 'react';
import { fetchFlag } from '@/APIs/fetchFlags';

function TooltipComponent({ tooltipVisible, tooltipPosition, tooltipContent }) {
  const [countryFlag, setCountryFlag] = useState(null);

  useEffect(() => {
    const getFlag = async () => {
      if (tooltipContent.countryname) {
        const flag = await fetchFlag(tooltipContent.countryname);
        setCountryFlag(flag);
      }
    };
    
    getFlag();
  }, [tooltipContent]);

  return (
    <>
      {tooltipVisible && (
        <div
          className="fixed flex flex-col gap-2  w-max bg-white border border-[#dadada] rounded-[5px] shadow-sm  text-black p-2  opacity-100 transition-opacity duration-300"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <div className='flex gap-[10px] items-center'>
            {countryFlag && <img
              src={countryFlag}
              alt={`${tooltipContent.countryname} Flag`}
              loading="lazy"
              width="30"
              height="20"
              className='border'
            />}
            <p className='text-[#2d2d2d] text-[14px]'>
              {tooltipContent.countryname} - {tooltipContent.countryData}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default TooltipComponent;
