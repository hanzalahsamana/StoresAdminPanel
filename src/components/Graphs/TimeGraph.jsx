"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import BarLoader from "../Loader/BarLoader";

const TimeGraph = ({ analytics, analyticsLoading }) => {

    
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: "line-bar",
            fontFamily: "'Rubik', sans-serif",
            animations: { enabled: false },
            toolbar: { show: false }, // Disable zoom, download, and drag
            zoom: { enabled: false },
        },
        markers: {
            size: 4,
          },
        grid: {
            borderColor: "#06a4a720",
            row: { colors: ["transparent", "transparent"], opacity: 0.5 },
        },
        xaxis: {
            collections: [],
            labels: {
                style: { colors: "#6E8192", fontSize: "12px" },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: ["#06989a"],
                    fontSize: "12px",
                    fontFamily: "'Montserrat', sans-serif",
                },
            },
        },
        dataLabels: { enabled: false },
        colors: ["#06989a"],
        stroke: { curve: "smooth", width: 2 },
        tooltip: { theme: "dark" },
    });

    const [chartSeries, setChartSeries] = useState([]);

    useEffect(() => {
        if (!analytics) return;

        let dataPairs = analytics.countries.map(country => ({
            country: country.country,
            users: parseInt(country.users, 10),
        }));

        // Shuffle data to make the flow random
        dataPairs = dataPairs.sort(() => Math.random() - 0.5);

        const collections = dataPairs.map(item => item.country);
        const data = dataPairs.map(item => item.users);

        setChartOptions(prev => ({
            ...prev,
            xaxis: { ...prev.xaxis, collections },
        }));
        setChartSeries([{ name: "Country Views", data }]);
    }, [analytics]);

    if (analyticsLoading) {
        return <BarLoader />;
    }

    return (
        <div className="w-full h-full pb-[30px]">
            <ReactApexChart options={chartOptions} series={chartSeries} type="line" height="270px" />
        </div>
    );
};

export default TimeGraph;
