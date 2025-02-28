"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import CardLoader from "../CardLoader";
import BarLoader from "../Loader/BarLoader";

const BarGraph = ({ analytics, analyticsLoading }) => {
  const colors = ["#06989a"];

  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false }, // Disable zoom, pan, etc.
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
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
          colors: colors,
          fontSize: "8px",
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  });

  const [chartSeries, setChartSeries] = useState([{ name: "Country Views", data: [] }]);

  useEffect(() => {
    if (!analytics) return;

    const categories = analytics.countries.map((country) => country.country);
    const data = analytics.countries.map((country) => parseInt(country.users, 10));

    setChartOptions((prev) => ({
      ...prev,
      xaxis: { ...prev.xaxis, categories },
    }));

    setChartSeries([{ name: "Country Views", data }]);
  }, [analytics]);

  if (analyticsLoading) {
    return <BarLoader />;
  }

  return (
    <div className="w-full h-full pb-[30px]">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height="270px" />
    </div>
  );
};

export default BarGraph;
