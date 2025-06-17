"use client";

import InfoTooltip from "../Actions/InfoTooltip";

const CustomCard = ({ children, title, classes, icon , info , actions }) => {

  return (
    <div className={`px-[15px] py-[10px] w-full  rounded-md bg-backgroundC border-[1.5px] border-[#788a9a2c] customShodow  flex flex-col items-center h-auto ${classes}`} >
      <div className='flex justify-between  items-center w-full  mb-3 border-b  pb-[10px] '>
        <div className="flex text-[18px] items-center gap-2 w-full">
          {icon && icon}
          <p className='text-textC font-medium '>{title}</p>
          {info && <InfoTooltip id={title} content={info}/>}

        </div>
        <div>
          {actions && actions}
        </div>
      </div>
      <div className='flex-grow flex flex-col gap-4 w-full h-full justify-center items-center'>
        {children}
      </div>

    </div>
  )
}

export default CustomCard