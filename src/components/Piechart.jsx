"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import CardLoader from "./CardLoader";


const Piechart = ({ analytics, analyticsLoading }) => {
  if (analyticsLoading) {
    return (
      <CardLoader />
    )
  }

  const labels = analytics?.countries.map((item) => item.country);
  const series = analytics?.countries.map((item) => parseInt(item.users));

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    labels: labels,
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
        },
      },
    },
    legend: {
      position: "bottom",
      flex: 'column',
      labels: {
        colors: "#000000",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["transparent"],
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="donut" class />
    </div>
  );
};

export default Piechart;