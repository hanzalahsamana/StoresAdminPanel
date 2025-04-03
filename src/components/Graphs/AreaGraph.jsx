"use client";

import React from 'react';
import Chart from 'react-apexcharts';

const AreaGraph = ({ data = {} }) => {
  const categories = Object.keys(data);
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
    colors: ['#06989a'],
    legend: { show: false },
    markers: { size: 3 },
    xaxis: {
      categories,
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
