"use client";

import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Pagination = ({ totalPages = 5, currentPage = 2, onPageChange = () => { } }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (page) => {
        if (page !== currentPage) onPageChange(page);
    };

    return (
        <div className="flex items-center justify-center mt-6 space-x-1 text-sm">
            {/* Previous Button */}
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`justify-center items-center w-10 h-10 rounded-full !bg-black text-white hover:bg-opacity-75 transition ${currentPage === 1 ? 'invisible' : 'visible flex'}`}
            >
                <FaChevronLeft />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-4 py-2 text-lg font-sans ${page === currentPage
                        ? 'text-black font-normal'
                        : 'text-gray-400 font-light hover:text-black'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`justify-center items-center w-10 h-10 rounded-full bg-black text-white hover:opacity-75 transition ${currentPage === totalPages ? 'invisible' : 'visible flex'}`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
