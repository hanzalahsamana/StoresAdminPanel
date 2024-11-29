import React from "react";
import ReactApexChart from "react-apexcharts";


const Piechart = ({analytics , analyticsLoading}) => {
  if(analyticsLoading){
      return <h1>loading..</h1>
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
    <ReactApexChart options={options} series={series} type="donut"  />
  );
};

export default Piechart;
