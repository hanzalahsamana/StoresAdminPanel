import Link from 'next/link';
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi';

const BackButton = ({link = '#'}) => {
return (
    <Link href={link} className="absolute top-2 left-2  flex items-center text-[10px] text-gray-400 font-light border-none outline-none hover:text-gray-500 hover:translate-x-[-2px] transition-transform">
        <HiArrowLeft className="w-[10px] h-[10px] mr-1" />
        Back
    </Link>
);
}

export default BackButton