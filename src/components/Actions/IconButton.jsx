"use client";   
import React from 'react'
import { GrStatusPlaceholder } from 'react-icons/gr'
import { Tooltip } from 'react-tooltip'

const IconButton = ({ className, tooltipLabel = null, icon = <GrStatusPlaceholder />, action = () => { } }) => {
    return (
        <div role='button' data-tooltip-id={"preview"}
            data-tooltip-content={tooltipLabel}
            onClick={action}
            className={`text-[20px] flex items-center justify-center cursor-pointer hover:opacity-80 px-2 h-full select-none ${className} `}>
            {icon}
            <Tooltip id='preview' className="!text-[12px] font-semibold !px-3 !py-1.5 z-[200] " />
        </div>
    )
}

export default IconButton