import React from 'react'
import { GrStatusPlaceholder } from 'react-icons/gr'
import { Tooltip } from 'react-tooltip'

const IconButton = ({ className, tooltipLabel = null, icon = <GrStatusPlaceholder />, action = () => { } }) => {
    return (
        <div data-tooltip-id={"preview"}
            data-tooltip-content={tooltipLabel}
            className={`text-[20px] cursor-pointer hover:opacity-80 ${className} `} onClick={action}>
            {icon}
            <Tooltip id='preview' className="!text-[12px] "/>
        </div>
    )
}

export default IconButton