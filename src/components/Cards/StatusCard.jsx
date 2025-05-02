"use client";
import React from 'react'
import BarLoader from '../Loader/BarLoader';

const StatusCard = ({ title, data, classes, loading }) => {
  if (loading) {
    return (
      <BarLoader />
    )
  }
  return (
    <div className={`bg-backgroundC px-[15px] py-[10px] rounded-lg border border-borderC shadow-sm ${classes}`}>
      <p className='text-textC text-[16px] font-medium font-[inter] text-left'>{title}</p>
      <p className="text-xl mt-[10px] font-bold text-primaryC">{data}</p>
    </div>
  )
}

export default StatusCard