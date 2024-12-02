"use client";
import React from 'react'
import CardLoader from './CardLoader'

const StatusCard = ({title , data , classes , loading}) => {
    if(loading){
        return (
         <CardLoader/>
        )
    }
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${classes}`}>
      <h3 className="text-xl font-semibold text-gray-800">
        {title}
      </h3>
      <p className="text-2xl font-bold text-blue-500">{data?.length}</p>
    </div>
  )
}

export default StatusCard