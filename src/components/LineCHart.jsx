import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'line-bar',
            fontFamily: "'Rubik', sans-serif",
            animations: {
                easing: 'easeinout',
                enabled: true,
            },
            redrawOnWindowResize: true,
        },
        title: {
            text: 'Products of the Month',
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
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
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
            width: 4, // Correct type for width
        },
        tooltip: {
            theme: 'dark',
        },
    });

    const [chartSeries, setChartSeries] = useState([
        {
            name: 'Sales Overview',
            data: [0, 150, 120, 150, 135, 210, 180, 210, 240, 220, 250, 200],
        },
    ]);

    // useEffect(() => {
    //     const handleResize = () => {
    //         window.dispatchEvent(new Event('resize')); // Trigger chart resize
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <div className='w-full max-w-[500px] pointer-events-none'>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={300}
            />
        </div>
    );
};

export default LineChart;
