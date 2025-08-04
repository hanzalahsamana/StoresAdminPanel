import React, { useRef, useState, useEffect } from 'react';

const CustomRangeSlider = ({ min = 0, max = 1000, step = 10, onChange , label = null }) => {
    const trackRef = useRef(null);
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [dragging, setDragging] = useState(null); // 'min' or 'max'

    // Calculate position in %
    const getPercentage = (val) => ((val - min) / (max - min)) * 100;

    const handleMouseDown = (thumb) => setDragging(thumb);
    const handleMouseUp = () => setDragging(null);

    const handleMouseMove = (e) => {
        if (!dragging || !trackRef.current) return;
        const track = trackRef.current;
        const rect = track.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.min(Math.max(x / rect.width, 0), 1);
        const rawValue = min + percentage * (max - min);
        const snappedValue = Math.round(rawValue / step) * step;

        if (dragging === 'min') {
            const newVal = Math.min(snappedValue, maxVal - step);
            setMinVal(newVal);
            onChange && onChange([newVal, maxVal]);
        } else {
            const newVal = Math.max(snappedValue, minVal + step);
            setMaxVal(newVal);
            onChange && onChange([minVal, newVal]);
        }
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <div className='w-full max-w-72 flex flex-col gap-3 justify-center items-center'>
            {label && <p className="">{label}</p>}
            <div className="w-[95%] select-none">
                {/* Track */}

                <div
                    ref={trackRef}
                    className="relative h-1 bg-gray-300 rounded"
                >
                    {/* Filled Range */}
                    <div
                        className="absolute h-1 bg-black rounded"
                        style={{
                            left: `${getPercentage(minVal)}%`,
                            width: `${getPercentage(maxVal) - getPercentage(minVal)}%`,
                        }}
                    />

                    {/* Left Thumb */}
                    <div
                        onMouseDown={() => handleMouseDown('min')}
                        className="absolute top-1/2 transform -translate-y-1/2 bg-black boder-[1.5px] hover:scale-125 transition-transform border-gray-200 rounded-full w-4 h-4 cursor-pointer shadow"
                        style={{
                            left: `${getPercentage(minVal)}%`,
                            marginLeft: '-0.5rem',
                        }}
                    />

                    {/* Right Thumb */}
                    <div
                        onMouseDown={() => handleMouseDown('max')}
                        className="absolute top-1/2 transform -translate-y-1/2 bg-black boder-[1.5px] hover:scale-125 transition-transform border-gray-200  rounded-full w-4 h-4 cursor-pointer shadow"
                        style={{
                            left: `${getPercentage(maxVal)}%`,
                            marginLeft: '-0.5rem',
                        }}
                    />
                </div>

                {/* Display Values */}
                <div className="flex justify-between text-lg font-medium mt-2">
                    <span>Rs: {minVal}</span>
                    <span>Rs: {maxVal}</span>
                </div>
            </div>
        </div>
    );
};

export default CustomRangeSlider;
