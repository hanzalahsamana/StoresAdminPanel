"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Tooltip from "../Actions/Tooltip"; // Replace with your actual path
import BarLoader from "../Loader/BarLoader"; // Optional loader

// Manual color scale function (interpolation between two colors)
function interpolateColor(min, max, value) {
  const scale = (value - min) / (max - min);
  const r = Math.round(6 * scale);
  const g = Math.round(168 - 6 * scale);
  const b = Math.round(154 - 8 * scale);
  return `rgb(${r * 40}, ${g * 40}, ${b * 40})`;
}

const geoUrl =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const MapChart = ({ analytics, analyticsLoading }) => {
  if (analyticsLoading || typeof window === "undefined") {
    return <BarLoader />;
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

  // Get the min and max values from the analytics data to pass to the color scale function
  const analyticsValues = Object.values(analytics);
  const minCount = Math.min(...analyticsValues);
  const maxCount = Math.max(...analyticsValues);

  return (
    <div
      className="MapChartSvg flex justify-center h-[300px] flex-col items-center w-full relative"
      onMouseMove={handleMouseMove}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140 }}
      >
        <Geographies
          geography={geoUrl}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.name !== "Antarctica")
              .map((geo) => {
                const countryName = geo.properties.name;
                const userCount = analytics[countryName];

                // Calculate the color based on user count
                const countryColor = userCount
                  ? interpolateColor(minCount, maxCount, userCount)
                  : "#E0E0E0"; // Default color if no data

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryColor}
                    onMouseEnter={() => {
                      setTooltipContent({
                        countryname: countryName,
                        countryData: userCount || 0,
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

      <Tooltip
        tooltipPosition={tooltipPosition}
        tooltipVisible={tooltipVisible}
        tooltipContent={tooltipContent}
      />
    </div>
  );
};

export default MapChart;
