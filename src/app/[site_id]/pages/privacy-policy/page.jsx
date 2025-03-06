"use client";
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import React from 'react';
import { useSelector } from 'react-redux';

const PrivacyPolicy = () => {

  const selectedPage = useSelector((state) =>
    selectPageByType(state, "Privacy Policy")
);

  return (
    <div className="container max-w-[1500px] py-4 px-[3vw] max-[600px]:text-center">
      <h1 className="text-4xl font-bold text-center mb-6">{selectedPage?.title}</h1>
      <div className="mx-auto">

        <div className="text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: selectedPage?.text }}>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
