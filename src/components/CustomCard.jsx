"use client";
import React, { useState } from 'react'
import CustomDropdown from './CustomDropdown'

const CustomCard = ({children , title , classes}) => {
  const [selectedValue, setSelectedValue] = useState('Countries');

  return (
    <div  className={`px-[10px] py-[10px] overflow-hidden w-auto rounded-lg bg-[#ffffff] shadow-lg min-h-[300px] flex flex-col items-center ${classes}`} >
        <div className='flex justify-between  items-center w-full  mb-[20px] '>

        <p className='text-black text-[25px] font-semibold font-sans text-left'>{title}</p>
        <CustomDropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} options={['Countries', 'Pages']}/>
        </div>
        <div className='flex-grow flex flex-col w-full max-h-[350px] justify-center items-center'>

        {children}
        </div>
      
        </div>
  )
}

export default CustomCard