"use client";
import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Tooltip from "../Tooltip";
import CardLoader from "../CardLoader";
import BarLoader from "../Loader/BarLoader";

const colorScale = scaleLinear()
    .domain([1, 8])
    .range(["#06a4a740", "#06989a"]);

const geoUrl =
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const MapChart = ({ analytics, analyticsLoading }) => {
    if (analyticsLoading || typeof window === undefined) {
        return (
            <BarLoader />
        )
    }

    const [tooltipContent, setTooltipContent] = useState({});
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleMouseMove = (event) => {
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        setTooltipPosition({
            top: cursorY - 100,
            left: cursorX - 250,
        });
    };
    const handleMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };
    useEffect(() => {
        const svgElement = document.querySelector(".MapChartSvg svg");
        if (svgElement) {
            svgElement.setAttribute("viewBox", "0 -150 900 700");
        }
    }, []);

    return (
        <div className="MapChartSvg flex justify-center h-[300px] flex-col items-center w-full"
            onMouseMove={handleMouseMove}
        >
            <ComposableMap
                projection="geoMercator"


                projectionConfig={{
                    scale: 140,
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

            <Tooltip tooltipPosition={tooltipPosition} tooltipVisible={tooltipVisible} tooltipContent={tooltipContent} />
        </div>
    );
};

export default MapChart;
