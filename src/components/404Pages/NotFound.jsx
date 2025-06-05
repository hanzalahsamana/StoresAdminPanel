"use client";

import React, { useEffect, useState } from "react";
import NotFoundImage from "../../Assets/Images/404.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const [showGoBack, setShowGoBack] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    const isInternal = referrer.startsWith(window.location.origin);
    setShowGoBack(isInternal);
  }, []);

  const handleClick = () => {
    if (showGoBack) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="max-w-md bg-transparent rounded-2xl p-8">
        <div>
          <img
            src={NotFoundImage.src}
            alt="Page Not Found Illustration"
            className="w-48 mx-auto"
          />
        </div>

        <h1 className="text-3xl mt-[20px] font-bold text-gray-900">
          Page Not Found
        </h1>
        <p className="text-gray-600 mt-4">
          The page you're looking for doesn’t exist. It might have been removed or moved.
        </p>

        <div className="mt-10">
          <button
            onClick={handleClick}
            className="bg-black text-backgroundC px-5 py-2 rounded-lg font-medium hover:opacity-85 transition-all"
          >
            {showGoBack ? "Go Back" : "Go to Home"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
