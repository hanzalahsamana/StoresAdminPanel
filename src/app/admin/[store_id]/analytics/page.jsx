"use client";
import { FetchAnalytics } from '@/APIs/Analytics/FetchAnalytics';
import DropDown from '@/components/Actions/DropDown';
import CustomCard from '@/components/Cards/CustomCard';
import MapChart from '@/components/Graphs/MapChart';
import OrderListTable from '@/components/Tables/OrderListTable';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdArrowRightAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Analytics_Devices, Analytics_Time_Ranges } from '@/Structure/DefaultStructures';
import MetricsGrid from '@/components/Graphs/MetricsGrid';
import { FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import { formatNumberWithCommas } from '@/Utils/Formaters';
import { TbCashBanknote } from 'react-icons/tb';
import { IoWalletOutline } from 'react-icons/io5';
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";

const TimeGraph = dynamic(() => import("../../../../components/Graphs/TimeGraph"), { ssr: false });
const Piechart = dynamic(() => import("../../../../components/Graphs/Piechart"), { ssr: false });
const BarGraph = dynamic(() => import("../../../../components/Graphs/BarGraph"), { ssr: false });
const AreaGraph = dynamic(() => import("../../../../components/Graphs/AreaGraph"), { ssr: false });
const ComaprisnChart = dynamic(() => import("../../../../components/Graphs/ComaprisnChart"), { ssr: false });

const Analytics = () => {

  const { products } = useSelector((state) => state.productData);
  const { store } = useSelector((state) => state.store);
  const { currUser } = useSelector((state) => state.currentUser);
  const { analytics, analyticloading } = useSelector((state) => state.analytics);
  const [timeRange, setTimeRange] = useState('Last Year');

  useEffect(() => {
    FetchAnalytics(currUser?.token, store?._id, timeRange)
  }, [timeRange]);

  console.log(analytics?.revenueByPaymentMethod, "sdd");


  return (
    <div className='p-[20px]'>
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <DropDown placeholder='Duration' selectedOption={timeRange} setSelectedOption={setTimeRange} defaultOptions={Analytics_Time_Ranges} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-5 text-[25px] text-primaryC font-medium">
        <CustomCard title="Total Views">{analytics?.views}</CustomCard>
        <CustomCard title="Returning Users">{analytics?.returningUsers}</CustomCard>
        <CustomCard title="Total Revenue">{formatNumberWithCommas(analytics?.totalRevenue??0)}</CustomCard>
        <CustomCard title="Total Products">{analytics?.totalProducts}</CustomCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-5">

        <CustomCard title="Views Over Time" className="col-span-4">
          <AreaGraph data={analytics?.timeViews} analyticsLoading={analyticloading} />
        </CustomCard>

        <CustomCard title="Sessions by Devices" className="col-span-4 md:col-span-2">
          <MetricsGrid
            data={Object.keys(Analytics_Devices || {}).map((key) => ({
              name: Analytics_Devices?.[key].name,
              icon: Analytics_Devices?.[key].icon,
              value: analytics?.deviceViews[key] ?? 0,
            }))}
            suffix='views'
          />
        </CustomCard>

        <CustomCard title="Comparison Btw Orders and Carts " className="col-span-4 md:col-span-2">
          <ComaprisnChart data={{ "Abandoned Carts": analytics?.abandonedCarts, "Fullfilled Orders": analytics?.totalOrders }} />
        </CustomCard>

        <CustomCard title="Convertion Rate " className="col-span-4 md:col-span-2">
          <ComaprisnChart data={{ "Users Come on Website": analytics?.totalUsers ?? 0, "Users Converted into Customer ": analytics?.totalCustomers ?? 0 }} />
        </CustomCard>

        <CustomCard title="Revenue By Payment Methods" className="col-span-4 md:col-span-2">
          <MetricsGrid
            data={[
              {
                name: 'COD',
                icon: LiaMoneyBillWaveAltSolid,
                value: formatNumberWithCommas(analytics?.revenueByPaymentMethod?.cod ?? 0),
              },
              {
                name: 'Account',
                icon: IoWalletOutline,
                value: formatNumberWithCommas(analytics?.revenueByPaymentMethod?.account ?? 0),
              }
            ]}
            suffix='PKR'
          />
        </CustomCard>

        <CustomCard title="Sessions by Locations" className="col-span-4 md:col-span-2">
          <MapChart analytics={analytics?.countryViews} analyticsLoading={analyticloading} />
        </CustomCard>

        {/* <CustomCard title="Views Info" className="col-span-4 md:col-span-2">
          <BarGraph analytics={analytics} analyticsLoading={analyticloading} />
        </CustomCard> */}

        {/* <CustomCard title="Recent Orders" className="!h-auto col-span-4">
          <Link href="/ordersList" className="flex gap-1 w-full text-textTC justify-center items-center hover:gap-3 transition-all pt-5">
            See all <MdArrowRightAlt />
          </Link>
        </CustomCard> */}

      </div>
    </div>
  )
}

export default Analytics;