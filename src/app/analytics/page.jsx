"use client";
import { FetchAnalytics } from '@/APIs/Analytics/FetchAnalytics';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import DropDown from '@/components/Actions/DropDown';
import CustomCard from '@/components/Cards/CustomCard';
import MapChart from '@/components/Graphs/MapChart';
import StatusCard from '@/components/Cards/StatusCard';
import OrderListTable from '@/components/Tables/OrderListTable';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdArrowRightAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import DeviceTypeGraph from '@/components/Graphs/DeviceTypeGraph';


const TimeGraph = dynamic(() => import("../../components/Graphs/TimeGraph"), { ssr: false });
const Piechart = dynamic(() => import("../../components/Graphs/Piechart"), { ssr: false });
const BarGraph = dynamic(() => import("../../components/Graphs/BarGraph"), { ssr: false });
const AreaGraph = dynamic(() => import("../../components/Graphs/AreaGraph"), { ssr: false });
const ComaprisnChart = dynamic(() => import("../../components/Graphs/ComaprisnChart"), { ssr: false });

const options = [
  'Yesterday',
  'This Week',
  'Last 7 Days',
  'This Month',
  'Last 30 Days',
  'Last Year',
]

const Analytics = () => {

  const products = useSelector((state) => state.productData.products);
  const { orders, loading } = useSelector((state) => state?.orderData);
  const { analytics, analyticloading } = useSelector((state) => state.analytics);
  const [selectedValue, setSelectedValue] = useState('Last Year');
   const { siteName } = useSelector((state) => state.siteName);

  const dispatch = useDispatch();

  useEffect(() => {
    FetchAnalytics(dispatch, selectedValue , siteName)
  }, [selectedValue]);

  return (
    <div className='p-[20px]'>
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <DropDown className='!max-w-[150px]' placeholder='Duration' selectedOption={selectedValue} setSelectedOption={setSelectedValue} defaultOptions={options} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-5">
        <StatusCard title="Total Views" data={analytics?.views} loading={loading} />
        <StatusCard title="Returning Users" data={analytics?.returningUsers} loading={loading} />
        <StatusCard title="Total Orders" data={orders?.length} loading={loading} />
        <StatusCard title="Total Products" data={products?.length} loading={loading} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-5">
        <CustomCard title="Views Over Time" classes="col-span-4">
          <AreaGraph data={analytics?.timeViews} />
        </CustomCard>
        <CustomCard title="Sessions by Devices" classes="col-span-4 md:col-span-2">
          <DeviceTypeGraph views={analytics?.deviceViews} />
        </CustomCard>
        <CustomCard title="Comparison Btw Orders and Carts " classes="col-span-4 md:col-span-2">
          <ComaprisnChart data={{ data1: 175, data2: 100 }} />
        </CustomCard>
        <CustomCard title="Sessions by Locations" classes="col-span-4 md:col-span-2">
          <MapChart analytics={analytics?.countryViews} analyticsLoading={analyticloading} />
        </CustomCard>
        <CustomCard title="Views Info" classes="col-span-4 md:col-span-2">
          <BarGraph analytics={analytics} analyticsLoading={analyticloading} />
        </CustomCard>
        <CustomCard title="Recent Orders" classes="!h-auto col-span-4">
          <OrderListTable limit={5} />
          <Link href="/ordersList" className="flex gap-1 w-full text-textTC justify-center items-center hover:gap-3 transition-all pt-5">
            See all <MdArrowRightAlt />
          </Link>
        </CustomCard>

      </div>
    </div>
  )
}

export default ProtectedRoute(Analytics); {/* 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-5">
        <CustomCard title="Sessions by location" classes="sm:col-span-3">
          <AreaGraph />
        </CustomCard>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-5">
        <CustomCard title="Sessions by location" classes="sm:col-span-2">
          <TimeGraph analytics={analytics} analyticsLoading={analyticloading} />
        </CustomCard>

        <CustomCard title="Map" classes="">
          <MapChart analytics={analytics} analyticsLoading={analyticloading} />
        </CustomCard>

        <CustomCard title="Views by countries">
          <Piechart analytics={analytics} analyticsLoading={analyticloading} />
        </CustomCard>

        <CustomCard title="Sessions by location" classes="sm:col-span-2">
          <BarGraph analytics={analytics} analyticsLoading={analyticloading} />
        </CustomCard>
        <CustomCard title="Recent Orders" classes="!h-auto col-span-1 sm:col-span-2 lg:col-span-3">
          <OrderListTable limit={5} />
          <Link href="/ordersList" className="flex gap-1 w-full justify-center items-center hover:gap-3 transition-all pt-5">
            See all <MdArrowRightAlt />
          </Link>
        </CustomCard>
      </div> */}