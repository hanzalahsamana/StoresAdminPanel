import React from 'react'
import { GoDash } from 'react-icons/go';
import Checkbox from '../Actions/CheckBox';

const GalleryImageCard = ({ image, className, isChecked, toggleImageSelect }) => {
    return (
        <div
            onClick={() => toggleImageSelect(image)}
            className={`p-3 rounded-lg relative cursor-pointer transition-all ${className} ${isChecked ? 'bg-gray-200' : 'hover:bg-gray-100 bg-transparent'}`}
        >

            {/* <div className={`absolute bg-black w-full h-full top-0 right-0 z-[1] rounded-lg ${isChecked ? 'opacity-15' : 'opacity-0'}`}></div> */}
            <div className="p-0 rounded-lg border bg-white relative overflow-hidden">
            <Checkbox
                checked={isChecked ? true : false}
                setChecked={() => { }}
                label={null}
                className="!absolute top-1 z-[2] left-1 pointer-events-none !text-black "
            />
                <img
                    className="!aspect-square border-none rounded-lg w-full h-full  object-contain"
                    src={image?.url}
                    alt=""
                />
            </div>
        </div>
    )
}

export default GalleryImageCard