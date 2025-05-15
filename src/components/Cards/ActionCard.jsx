import React from 'react'
import TextLoader from '../Loader/TextLoader'
import BackButton from '../Actions/BackButton'

const ActionCard = ({ lable, actionPosition = 'bottom', className, children, actions, error, loading = false, loader = <TextLoader />, icon, subText = null}) => {
    return (
        <div className={`relative p-5 w-full border-[1.5px]  rounded-md flex flex-col gap-[20px] bg-backgroundC ${error ? 'border-[red]' : 'border-[#788a9a2c]'} ${className}`}>

            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4 text-textC'>
                    {icon && icon}
                    <div className='flex flex-col gap-1'>
                        <h1 className=" font-semibold text-[23px] md:text-[30px] leading-[30px] ">{lable}</h1>
                        {subText && <p className='text-textTC text-[13px]'>{subText}</p>}
                    </div>
                </div>
                {actionPosition === 'top' && (
                    <div className="flex justify-end items-center  gap-[20px]">
                        {actions}
                    </div>
                )}
                {error?.message && (
                    <p className=' text-red-500 text-[14px] '>{error?.message}</p>
                )}
            </div>

            {loading ? (
                loader
            ) : (
                children
            )}
            {actionPosition === 'bottom' && (
                <div className="flex justify-end items-end flex-1 mt-[15px] gap-[20px]">
                    {actions}
                </div>
            )}
        </div>
    )
}

export default ActionCard