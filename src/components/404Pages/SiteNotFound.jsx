import React from 'react'
import { Base_Domain, HTTP } from '../../../config'
import SiteNotFoundImage from "../../Assets/Images/site-not-found.png";
import Link from 'next/link'

const SiteNotFound = () => {
    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <div className="max-w-md bg-transparent rounded-2xl p-8">
                <div className="">
                    <img
                        src={SiteNotFoundImage.src}
                        alt="Site Not Found Illustration"
                        className="w-[320px] mx-auto"
                    />
                </div>

                <h1 className="text-3xl mt-[20px] font-bold text-gray-900">
                    This store does not exist.
                </h1>
                <p className="text-gray-600 mt-4">
                    The site you're looking for doesn’t exist. It might have been removed or moved.
                </p>

                <div className="mt-10">
                    <Link
                        href={`${HTTP}${Base_Domain}/authentication/register`}
                        className="bg-black text-backgroundC px-5 py-2 rounded-lg font-medium hover:opacity-85 transition-all"
                    >
                        Create Your Store
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SiteNotFound