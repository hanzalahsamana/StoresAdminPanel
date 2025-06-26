"use client";
import { FetchAnalytics } from '@/APIs/Analytics/FetchAnalytics';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import DropDown from '@/components/Actions/DropDown';
import CustomCard from '@/components/Cards/CustomCard';
import MapChart from '@/components/Graphs/MapChart';
import OrderListTable from '@/components/Tables/OrderListTable';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdArrowRightAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import DeviceTypeGraph from '@/components/Graphs/DeviceTypeGraph';


const TimeGraph = dynamic(() => import("../../../../components/Graphs/TimeGraph"), { ssr: false });
const Piechart = dynamic(() => import("../../../../components/Graphs/Piechart"), { ssr: false });
const BarGraph = dynamic(() => import("../../../../components/Graphs/BarGraph"), { ssr: false });
const AreaGraph = dynamic(() => import("../../../../components/Graphs/AreaGraph"), { ssr: false });
const ComaprisnChart = dynamic(() => import("../../../../components/Graphs/ComaprisnChart"), { ssr: false });

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
    FetchAnalytics(dispatch, selectedValue, siteName)
  }, [selectedValue]);

  return (
    <div className='p-[20px]'>
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <DropDown className='!max-w-[150px]' placeholder='Duration' selectedOption={selectedValue} setSelectedOption={setSelectedValue} defaultOptions={options} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-5 text-[25px] text-primaryC font-semibold">
        <CustomCard title="Total Views">{analytics?.views}</CustomCard>
        <CustomCard title="Returning Users">{analytics?.returningUsers}</CustomCard>
        <CustomCard title="Total Orders">{orders?.length}</CustomCard>
        <CustomCard title="Total Products">{products?.length}</CustomCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-5">

        <CustomCard title="Views Over Time" className="col-span-4">
          <AreaGraph data={analytics?.timeViews} />
        </CustomCard>

        <CustomCard title="Sessions by Devices" className="col-span-4 md:col-span-2">
          <DeviceTypeGraph views={analytics?.deviceViews} />
        </CustomCard>

        <CustomCard title="Comparison Btw Orders and Carts " className="col-span-4 md:col-span-2">
          <ComaprisnChart data={{ "Abandoned Carts": 175, "Orders": 100 }} />
        </CustomCard>

        <CustomCard title="Sessions by Locations" className="col-span-4 md:col-span-2">
          <MapChart analytics={analytics?.countryViews} analyticsLoading={analyticloading} />
        </CustomCard>

        <CustomCard title="Views Info" className="col-span-4 md:col-span-2">
          <BarGraph analytics={analytics} analyticsLoading={analyticloading} />
        </CustomCard>

        <CustomCard title="Recent Orders" className="!h-auto col-span-4">
          <OrderListTable limit={5} />
          <Link href="/ordersList" className="flex gap-1 w-full text-textTC justify-center items-center hover:gap-3 transition-all pt-5">
            See all <MdArrowRightAlt />
          </Link>
        </CustomCard>

      </div>
    </div>
  )
}

export default Analytics;