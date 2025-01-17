"use client";

import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import CardLoader from './CardLoader';

const TimeGraph = ({ analytics, analyticsLoading }) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'line-bar',
            fontFamily: "'Rubik', sans-serif",
            animations: {
                easing: 'easeinout',
                enabled: true,
            },
        },
        title: {
            text: 'Views of Pages',
            align: 'left',
            margin: 10,
            style: {
                fontSize: '14px',
                color: '#6E8192',
            },
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            row: {
                colors: ['#e9ecef', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: [],
            labels: {
                style: {
                    colors: '#6E8192',
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: ['#99abb4'],
                    fontSize: '12px',
                    fontFamily: "'Montserrat', sans-serif",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#398bf7'],
        stroke: {
            curve: 'straight',
            width: 4,
        },
        tooltip: {
            theme: 'dark',
        },
    });

    const [chartSeries, setChartSeries] = useState([]);
    const [viewType, setViewType] = useState('pages'); // Default view type

    useEffect(() => {
        if (!analytics) return;

        if (viewType === 'pages') {
            const categories = analytics.pages.map((page) => page.page);
            const data = analytics.pages.map((page) => parseInt(page.users, 10));
            setChartOptions((prev) => ({
                ...prev,
                xaxis: { ...prev.xaxis, categories },
                title: { ...prev.title, text: 'Views of Pages' },
            }));
            setChartSeries([{ name: 'Page Views', data }]);
        } else if (viewType === 'countries') {
            const categories = analytics.countries.map((country) => country.country);
            const data = analytics.countries.map((country) => parseInt(country.users, 10));
            setChartOptions((prev) => ({
                ...prev,
                xaxis: { ...prev.xaxis, categories },
                title: { ...prev.title, text: 'Views by Countries' },
            }));
            setChartSeries([{ name: 'Country Views', data }]);
        }
    }, [analytics, viewType]);

    if (analyticsLoading) {
        return <CardLoader />;
    }

  return (
    <div className='w-full'>
            <div className="mb-4">
                <select
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="pages">Pages</option>
                    <option value="countries">Countries</option>
                </select>
            </div>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={300}
            />
        </div>
  )
}

export default TimeGraph