"use client";
import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Tooltip from "./Tooltip";
import CardLoader from "./CardLoader";

const data = [
    { name: "Pakistan", value: 8 },
    { name: "India", value: 1 },
];




const colorScale = scaleLinear()
    .domain([1, 8])
    .range(["#b3d7ff", "#003366"]);

const geoUrl =
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const MapChart = ({ analytics, analyticsLoading }) => {
    if(analyticsLoading || typeof window === undefined){
        return (
         <CardLoader/>
        )
    }

    const [tooltipContent, setTooltipContent] = useState({});
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleMouseMove = (event) => {
        const cursorX = event.clientX ;
        const cursorY = event.clientY;

        setTooltipPosition({
            top: cursorY -100,
            left: cursorX - 250,
        });
    };
    const handleMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (
        <div className="flex justify-center flex-col items-center w-full mt-[90px] scale-105"
            onMouseMove={handleMouseMove}
        >
            <ComposableMap
                projection="geoMercator"

                projectionConfig={{
                    scale: 80,
                }}
            >
                <Geographies geography={geoUrl} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {({ geographies }) =>
                        geographies
                            .filter((geo) => geo.properties.name !== "Antarctica")
                            .map((geo) => {
                                const countryData = analytics?.countries?.find(
                                    (country) => country.country === geo.properties.name
                                );
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={countryData ? colorScale(countryData.users) : "#E0E0E0"}
                                        onMouseEnter={() => {
                                            setTooltipContent({
                                                countryname: geo.properties.name,
                                                countryData: countryData ? countryData.users : 0,
                                            });
                                        }}
                                        onMouseLeave={() => setTooltipContent({})}
                                        className="hover:fill-[#303030]"
                                        style={{
                                            default: {
                                                outline: "none",
                                                stroke: "#fff",
                                                strokeWidth: 0.5,
                                            },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                    }
                </Geographies>
            </ComposableMap>

            <Tooltip tooltipPosition={tooltipPosition}  tooltipVisible={tooltipVisible} tooltipContent={tooltipContent} />

            {/* <table style={{ marginTop: "20px", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Country</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.name}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {row.name}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default MapChart;
