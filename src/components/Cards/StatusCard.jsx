"use client";
import React from 'react'
import { GoDotFill } from 'react-icons/go';

const StatusCard = ({ label = "Active", status = true, className }) => {

  return (
    <div className={`flex gap-1 py-[2px] justify-start text-nowrap  items-center text-sm w-max px-[13px] rounded-2xl ${status ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} ${className}`}>
      <GoDotFill />
      {label}
    </div>
  )
}

export default StatusCard