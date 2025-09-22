"use client";

import { GraphColors } from '@/Structure/DefaultStructures';
import React from 'react';
import Chart from 'react-apexcharts';
import BarLoader from '../Loader/BarLoader';

const AreaGraph = ({ data = {} , analyticsLoading }) => {

  if (analyticsLoading || typeof window === "undefined") {
    return <BarLoader />;
  }

  const collections = Object.keys(data);
  const views = Object.values(data);

  const optionsRevenue = {
    chart: {
      id: 'basic-bar',
      fontFamily: "'Rubik', sans-serif",
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false }, // Disable zooming
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 1 },
    colors: [GraphColors?.pri],
    legend: { show: false },
    markers: { size: 3 },
    xaxis: {
      collections,
      labels: {
        show: true,
        style: { colors: '#99abb4', fontSize: '12px' },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: { colors: '#99abb4', fontSize: '12px' },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.2)',
      strokeDashArray: 2,
    },
    tooltip: { theme: 'dark' },
  };


  const seriesRevenue = [
    {
      name: 'Views',
      data: views,
    },
  ];

  return (
    <div className="revenue w-full" style={{ height: '320px' }}>
      <Chart options={optionsRevenue} series={seriesRevenue} type="area" height="320" />
    </div>
  );
};

export default AreaGraph;
