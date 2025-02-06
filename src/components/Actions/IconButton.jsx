import React from 'react'
import { GrStatusPlaceholder } from 'react-icons/gr'

const IconButton = ({ className, icon =  <GrStatusPlaceholder/>, action = () => { } }) => {
    return (
        <div className={`text-[20px] cursor-pointer hover:opacity-80 ${className} `} onClick={action}>
            {icon}
        </div>
    )
}

export default IconButton