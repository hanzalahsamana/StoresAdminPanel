import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Tooltip from "./Tooltip";

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
    if (analyticsLoading) {
        return <h1>loading..</h1>
    }
    console.log(analytics);
    
    const [tooltipContent, setTooltipContent] = useState({});
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleMouseMove = (event) => {
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        setTooltipPosition({
            top: cursorY + 10,
            left: cursorX + 10,
        });
    };
    const handleMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (
        <div className="flex justify-center flex-col items-center"
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
                                        style={{
                                            default: {
                                                outline: "none",
                                                stroke: "#fff",
                                                strokeWidth: 0.5,
                                            },
                                            hover: { outline: "none", fill: "rgb(137 137 137)" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                    }
                </Geographies>
            </ComposableMap>

            <Tooltip tooltipPosition={tooltipPosition} tooltipVisible={tooltipVisible} tooltipContent={tooltipContent} />

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
