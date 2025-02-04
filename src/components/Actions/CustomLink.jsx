import Link from 'next/link'
import React from 'react'

const CustomLink = ({ link = '/', linkText = 'Link', text = '', className = '' }) => {
    return (
        <div className={`w-full text-center text-textC ${className}`}>
            <p>{text} <Link href={link} className="text-primaryC hover:opacity-80">{linkText}</Link></p>
        </div>
    )
}

export default CustomLink;