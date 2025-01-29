'use client'
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import React from 'react';
import { useSelector } from 'react-redux';

const AboutUs = () => {
  const selectedPage = useSelector((state) =>
    selectPageByType(state, "About Us")
  );

  return (
    <div className="container max-w-[1500px] py-4 px-[3vw] max-[600px]:text-center">
      <h1 className="text-4xl font-bold text-center mb-8">{selectedPage?.title}</h1>
      <div className="mx-auto">
        <div className="text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: selectedPage?.text }}>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
