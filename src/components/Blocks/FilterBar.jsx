import React from 'react'
import CustomRangeSlider from '../Actions/PriceRangeSlider'
import { VscClose } from 'react-icons/vsc'
import Button from '../Actions/Button'
import { LuArrowLeftToLine } from 'react-icons/lu'
import { BsArrowBarLeft } from 'react-icons/bs'

const FilterBar = ({ isOpen, setIsOpen, OnApplyFilter }) => {
    return (
        <div className=" min-w-[300px] max-w-[300px] sticky left-0 top-0 bottom-0 h-screen flex flex-col  border border-l justify-start gap-5 p-4 bg-gray-100">
            <div className='flex justify-between items-center w-full'>
                <p className="text-2xl font-bold transition-all">Filters</p>
                <BsArrowBarLeft className="text-xl" />
            </div>
            <div className='flex flex-col gap-4'>
                <div className="flex flex-col gap-2 text-sm font-medium ">
                    <p className="text-xl font-medium transition-all">Price range</p>
                    <CustomRangeSlider
                        min={0}
                        max={1000}
                        step={10}
                        onChange={([min, max]) => console.log('Selected range:', min, max)}
                    />
                </div>
                <div className="flex flex-col gap-2 text-sm font-medium ">
                    <p className="text-xl font-medium transition-all">Colors</p>
                    <div className='flex flex-wrap gap-2 '>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-black"></span>Black</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-red-500"></span>Red</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-black"></span>Black</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-blue-500"></span>Blue</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-green-500"></span>Green</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-yellow-500"></span>Yellow</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-blue-500"></span>Blue</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-yellow-500"></span>Yellow</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-green-500"></span>Green</p>
                        <p className="px-3 py-1 border border-gray-300 rounded-3xl flex items-center cursor-pointer transition-all"><span className="inline-block rounded-full w-4 h-4 mr-2 bg-red-500"></span>Red</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 items-end justify-end pt-5 flex-1">
                <Button
                    size="small"
                    variant="white"
                    label="Reset"
                    active={true}
                />
                <Button
                    size="small"
                    variant="black"
                    label="Apply"
                    active={true}
                />
            </div>
        </div>
    )
}

export default FilterBar