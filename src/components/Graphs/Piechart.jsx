"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import BarLoader from "../Loader/BarLoader";

const Piechart = ({ analytics, analyticsLoading }) => {
  if (analyticsLoading) {
    return <BarLoader />;
  }

  const labels = analytics?.countries.map((item) => item.country);
  const series = analytics?.countries.map((item) => parseInt(item.users));

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    labels: labels,
    colors: [
      "#06989a", // Teal (base color)
      "#04c4c7", // Bright Aqua
      "#00a8a2", // Sea Green
      "#3dd5a8", // Mint Green
      "#2a7f62", // Deep Green-Teal
      "#70e3c0", // Soft Green
      "#0caba8", // Turquoise
    ],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "80%",
        },
      },
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.1,
        },
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: "darken",
          value: 0.2,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        background: "#1E1E1E",
        color: "#ffffff",
      },
    },
  };

  return (
    <div className="w-[250px] h-[250px] aspect-square p-2">
      <ReactApexChart options={options} series={series} type="donut" width="100%" height="100%" />
    </div>
  );
};

export default Piechart;
