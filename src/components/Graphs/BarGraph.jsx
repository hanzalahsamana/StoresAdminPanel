"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import BarLoader from "../Loader/BarLoader";

const BarGraph = ({ analytics, analyticsLoading }) => {
  if (analyticsLoading || typeof window === undefined) {
    return (
        <BarLoader />
    )
}
  const colors = ["#06989a"];
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "45%",
        distributed: true,
        borderRadius: 0, // Removes the border radius
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: "#99abb4",
          fontSize: "10px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#99abb4", // Change to any color you want
          fontSize: "8px",  // Adjust font size
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: false, // Removes background grid lines
    },
  });
  

  const [chartSeries, setChartSeries] = useState([{ name: "Metrics", data: [] }]);

  useEffect(() => {
    if (!analytics) return;

    const categories = [
      "New Users",
      "Returning Users",
      "New Views",
      "Total Users",
      "Active Users",
      "Sessions",
      "Bounce Rate",
    ];

    const data = [
      parseInt(analytics.newUsers, 10),
      parseInt(analytics.returningUsers, 10),
      parseInt(analytics.newViews, 10),
      parseInt(analytics.totalUsers, 10),
      parseInt(analytics.activeUsers, 10),
      parseInt(analytics.sessions, 10),
      parseFloat(analytics.bounceRate), // Assuming bounce rate can be a decimal
    ];

    setChartOptions((prev) => ({
      ...prev,
      xaxis: { ...prev.xaxis, categories },
    }));

    setChartSeries([{ name: "Metrics", data }]);
  }, [analytics]);


  return (
    <div className="w-full h-full pb-[30px]">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height="270px" />
    </div>
  );
};

export default BarGraph;
