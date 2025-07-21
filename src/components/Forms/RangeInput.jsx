"use client";
import React, { useEffect } from "react";

const RangeInput = ({
  label = "Select Range",
  range = 0,
  setRange = () => { },
  className = "",
  min = 0,
  max = 100,
}) => {
  // Clamp value to stay within min and max
  useEffect(() => {
    if (range < min) {
      setRange(min);
    } else if (range > max) {
      setRange(max);
    }
  }, [range, min, max, setRange]);

  const handleChange = (val) => {
    const numericVal = Number(val);
    if (!isNaN(numericVal)) {
      const clampedVal = Math.max(min, Math.min(max, numericVal));
      setRange(clampedVal);
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={range}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full h-1 accent-primaryC rangeSlider"
        />

        <input
          type="number"
          min={min}
          max={max}
          value={range}
          onChange={(e) => handleChange(e.target.value)}
          className="w-16 border rounded-lg  px-2 py-1 text-sm text-gray-700"
        />
      </div>
    </div>
  );
};

export default RangeInput;
