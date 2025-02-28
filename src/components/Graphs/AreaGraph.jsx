"use client";

import React from 'react'
import Chart from 'react-apexcharts';
const AreaGraph = () => {
    const optionsRevenue = {
        chart: {
          id: 'basic-bar',
          fontFamily: "'Rubik', sans-serif",
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        colors: ['#06989a', '#066fa7'],
        legend: {
          show: false,
        },
        markers: {
          size: 3,
        },
        xaxis: {
          categories: ['0', '4', '8', '12', '16', '20', '24', '30'],
          labels: {
            show: true,
            style: {
              colors: '#99abb4',
              fontSize: '12px',
            },
          },
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: '#99abb4',
              fontSize: '12px',
            },
          },
        },
        grid: {
          borderColor: 'rgba(0,0,0,0.2)',
          strokeDashArray: 2,
        },
        tooltip: {
          theme: 'dark',
        },
      };
      const seriesRevenue = [
        {
          name: 'Product A',
          data: [0, 2, 3.5, 0, 13, 1, 4, 1],
        },
        {
          name: 'Product B',
          data: [0, 4, 0, 4, 0, 4, 0, 4],
        },
      ];
  return (
    <div className="revenue w-full" style={{ height: '320px' }}>
    <Chart options={optionsRevenue} series={seriesRevenue} type="area" height="320" />
  </div>
  )
}

export default AreaGraph