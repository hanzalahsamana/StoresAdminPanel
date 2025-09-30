'use client';

import WebPrevFrame from '@/components/Layout/WebPrevFrame';
import { GoDotFill } from 'react-icons/go';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { Base_Domain, HTTP } from '../../../../../config';
import Button from '@/components/Actions/Button';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import IconButton from '@/components/Actions/IconButton';
import { IoCopyOutline } from 'react-icons/io5';
import { copyToClipboard } from '@/Utils/MiniUtils';
import ReferralModal from '@/components/Modals/refferalModal';
import { useState } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const { store } = useSelector((state) => state.store);

  return (
    <div className="flex flex-col justify-end h-[calc(100vh-60px)] w-full">
      <div className="">
        <WebPrevFrame />
      </div>
      <div className="bg-backgroundC shadow-md border-t">
        <div className=" grid grid-cols-4 gap-6 py-3 px-6">
          {/* This is the APi for get the perfomance analytics of site  */}
          {/* https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://dev.xperiode.com/store/68416a1bd4645140e49c62d8&key=AIzaSyD4wVoxqtSsstQXYUnaBD94WbtQNxR9Pig */}
          <div className="flex justify-between  gap-6 bg-[#eeeff1f0] rounded p-3 shadow-sm border border-b-4 border-b-primaryC ">
            <p>Wesite Perfomance</p>
            <p className="text-green-600">90%</p>
          </div>
          <div className="flex justify-between  gap-6 bg-[#eeeff1f0] rounded p-3 shadow-sm border border-b-4 border-b-primaryC ">
            <p>Loading Speed</p>
            <p className="text-green-600">1.2s</p>
          </div>
          <div className="flex justify-between  gap-6 bg-[#eeeff1f0] rounded p-3 shadow-sm border border-b-4 border-b-primaryC ">
            <p>SEO Perfomance</p>
            <p className="text-green-600">Top 80%</p>
          </div>
          <div className="flex justify-between  gap-6 bg-[#eeeff1f0] rounded p-3 shadow-sm border border-b-4 border-b-primaryC ">
            <p>Grid Optimization</p>
            <p className="text-red-600">40%</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-start sm:items-center py-[20px] md:px-[30px] px-[15px] flex-col gap-[10px] sm:flex-row">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <p className="text-textC text-[18px]">{store?.storeName} </p>
                <p className="bg-secondaryC flex gap-1 justify-center items-center text-primaryC text-center text-sm w-max px-[13px] rounded-2xl">
                  <GoDotFill />
                  live
                </p>
              </div>
              <div className="flex gap-2 items-center text-blue-400">
                <Link target="_blank" className=" flex gap-1 items-center " href={`${HTTP}${store?.subDomain || store?.storeName}.${Base_Domain}`}>
                  {store?.subDomain || store?.storeName}.{Base_Domain} <FiArrowUpRight />
                </Link>
                <IconButton
                  icon={<IoCopyOutline />}
                  className="text-primaryC !text-blue-400 !text-[14px]"
                  action={() => copyToClipboard(`${HTTP}${store?.subDomain || store?.storeName}.${Base_Domain}`)}
                />
              </div>
            </div>
          </div>
          <div>
            <Button label="Customize" action={() => router.push('/design')} variant="black" className="bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
