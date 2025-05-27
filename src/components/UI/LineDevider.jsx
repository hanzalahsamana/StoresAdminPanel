import React from 'react'

const LineDevider = ({
    label,
    alignment = 'center' // center , left , right
}) => {
    return (
        <div className='w-full flex items-center'>
            {(alignment === "center" || alignment === "right") && <div className='h-[1px] bg-borderC w-full'></div>}
            <p className='px-[10px] text-textTC'>{label}</p>
            {(alignment === "center" || alignment === "left") && <div className='h-[1px] bg-borderC w-full'></div>}

        </div>
    )
}

export default LineDevider