'use client';

import HomeLayout from '@/components/Layout/HomeLayout';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {

  useEffect(()=>{
    const data = fetchHomePage()
    setinReduxHomePage(data)
    console.log("☠️☠️☠️");
  },[])
  const { sectionsData } = useSelector((state) => state.sectionsData);
  return <HomeLayout homePageData={sectionsData} />;
}
