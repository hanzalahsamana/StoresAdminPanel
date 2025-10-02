'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import TemplateHeader from './TemplateHeader';
import TemplateFooter from './TemplateFooter';

const StoreLayoutWrap = ({ children }) => {
  const { store } = useSelector((state) => state.store);
  const { header, footer } = store;
  return (
    <div className="max-w-[1500px] w-full bg-[var(--tmp-pri)] min-h-[100vh] flex flex-col justify-between">
      <TemplateHeader sectionData={header} />
      {children}
      <TemplateFooter sectionData={footer} />
    </div>
  );
};

export default StoreLayoutWrap;
