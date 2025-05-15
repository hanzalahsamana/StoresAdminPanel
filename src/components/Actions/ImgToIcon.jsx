import React from 'react'

const ImgToIcon = ({url ,className}) => {
  return (
    <div className={`w-[50px] overflow-hidden ${className}`}>
        <img src={url} alt="icon" className='w-full h-full object-cover' />
    </div>
  )
}

export default ImgToIcon