'use client';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

const FAQs = ({content}) => {
    const [openIndex, setOpenIndex] = useState(null);    

    return (
        <div className="max-w-[1000px] mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">{content?.title}</h1>
            {content?.faqs?.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 py-4 ">
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full text-left flex justify-between items-center"
                    >
                        <h2 className="text-lg max-[550px]:text-[15px] font-semibold" >{faq?.Q}</h2>
                        <span className={`transition ${openIndex !== index && 'rotate-45'}`}><IoClose /></span>
                    </button>
                    <div className={`transition-all ${openIndex === index ? 'h-[100px]' : 'h-[0px]'} overflow-hidden`}>

                        <p className={`mt-2 max-[550px]:text-[15px] text-gray-600`}>
                            {faq?.A}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQs;
