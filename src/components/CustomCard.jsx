"use client";

const CustomCard = ({ children, title, classes }) => {

  return (
    <div className={`px-[15px] py-[10px] h-[320px] overflow-hidden rounded-lg bg-[#ffffff] border border-borderC shadow-sm flex flex-col items-center ${classes}`} >
      <div className='flex justify-between  items-center w-full  mb-[10px] '>
        <p className='text-textC text-[16px] font-medium font-[inter] text-left'>{title}</p>
      </div>
      <div className='flex-grow flex flex-col w-full h-full justify-center items-center'>
        {children}
      </div>

    </div>
  )
}

export default CustomCard