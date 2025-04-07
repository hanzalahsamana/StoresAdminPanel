import React from 'react'
import TextLoader from '../Loader/TextLoader'
import BackButton from '../Actions/BackButton'

const ActionCard = ({ lable, actionPosition = 'bottom', className, children, actions, error, loading = false, loader = <TextLoader /> }) => {
    return (
        <div className={`relative p-8 w-full border  rounded-md flex flex-col gap-[20px] bg-white ${error ? 'border-[red]' : 'border-borderC'} ${className}`}>
            
            <div className='flex justify-between items-center mt-[15px]'>
                <h1 className="text-textC font-semibold font-[inter] text-[16px] md:text-[26px]">{lable}</h1>
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
                <div className="flex justify-end items-center mt-[15px] gap-[20px]">
                    {actions}
                </div>
            )}
        </div>
    )
}

export default ActionCard