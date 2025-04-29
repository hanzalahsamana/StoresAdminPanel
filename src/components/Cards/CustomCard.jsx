"use client";

const CustomCard = ({ children, title, classes }) => {

  return (
    <div className={`px-[15px] py-[10px] w-full  rounded-sm bg-[#ffffff] border border-borderC shadow-sm  flex flex-col items-center h-auto ${classes}`} >
      <div className='flex justify-between  items-center w-full  mb-3 '>
        <p className='text-textC text-[18px] font-medium  text-left w-full pb-[10px] border-b'>{title}</p>
      </div>
      <div className='flex-grow flex flex-col gap-4 w-full h-full justify-center items-center'>
        {children}
      </div>

    </div>
  )
}

export default CustomCard