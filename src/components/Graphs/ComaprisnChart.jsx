"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import BarLoader from "../Loader/BarLoader";

const ComparisonChart = ({ data , analyticsLoading }) => {

    if (analyticsLoading || typeof window === "undefined") {
        return (
            <BarLoader />
        )
    }
  const entries = Object.entries(data);
  if (entries.length < 2) return <p>Provide at least two values.</p>;

  const [firstKey, firstValue] = entries[0];
  const [secondKey, secondValue] = entries[1];

  const total = firstValue + secondValue;
  const firstPercentage = total > 0 ? ((firstValue / total) * 100).toFixed(1) : 0;
  const secondPercentage = total > 0 ? ((secondValue / total) * 100).toFixed(1) : 0;

  const commonOptions = {
    chart: { type: "donut", background: "transparent" },
    stroke: { show: false },
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: { expandOnClick: false, donut: { size: "80%" } },
    },
    tooltip: { enabled: true, y: { formatter: (val) => val } },
  };

  return (
    <div className="flex justify-center items-center gap-6">
      {/* First Pie Chart */}
      <div className="flex flex-col items-center">
        <div className="relative w-[80px] h-[80px] sm:w-[150px] sm:h-[150px]">
          <ReactApexChart
            options={{ ...commonOptions, labels: [firstKey, "Remaining"], colors: ["#06A89A", "#E0E0E0"] }}
            series={[firstValue, total - firstValue]}
            type="donut"
            width="100%"
            height="100%"
          />
          <div className="absolute inset-0 flex items-center sm:text-lg justify-center text-sm text-textC">
            {firstPercentage}%
          </div>
        </div>
        <p className="mt-2 text-[12px] font-medium text-[#99abb4]">{firstKey}</p>
      </div>

      <p className="text-[20px] text-textTC">VS</p>

      {/* Second Pie Chart */}
      <div className="flex flex-col items-center">
        <div className="relative w-[80px] h-[80px] sm:w-[150px] sm:h-[150px]">
          <ReactApexChart
            options={{ ...commonOptions, labels: [secondKey, "Remaining"], colors: ["#06A89A", "#E0E0E0"] }}
            series={[secondValue, total - secondValue]}
            type="donut"
            width="100%"
            height="100%"
          />
          <div className="absolute inset-0 flex items-center sm:text-lg justify-center text-sm text-textC">
            {secondPercentage}%
          </div>
        </div>
        <p className="mt-2 text-[12px] font-medium text-[#99abb4]">{secondKey}</p>
      </div>
    </div>
  );
};

export default ComparisonChart;
