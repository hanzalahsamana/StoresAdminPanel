import React, { useState } from "react";

const SizeSelector = ({ setSelectedSizes, selectedSizes }) => {
  const [manualSize, setManualSize] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "Custom Size"];

  const handleSelectSize = (size) => {
    if (size === "Custom Size") {
      setIsInputOpen(true);
    } else if (!selectedSizes.includes(size)) {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleManualSizeChange = (e) => {
    setManualSize(e.target.value);
  };

  const handleAddManualSize = () => {
    if (manualSize && !selectedSizes.includes(manualSize)) {
      setSelectedSizes([...selectedSizes, manualSize]);
      setManualSize("");
    }
  };

  const removeSize = (sizeToRemove) => {
    setSelectedSizes(selectedSizes.filter((size) => size !== sizeToRemove));
  };

  return (
    <div className="w-full">
      <select
        name="size"
        onChange={(e) => handleSelectSize(e.target.value)}
        className="p-[0.8rem] border-2 border-[#a1a1a1] rounded-md w-full"
      >
        <option value="">Select Size</option>
        {sizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {selectedSizes?.length > 0 && (
        <div className=" w-full flex gap-4 py-4">
          {selectedSizes.map((size) => (
            <div
              key={size}
              className="flex justify-between items-center p-2 border rounded bg-gray-100 gap-1"
            >
              <span>{size}</span>
              <button
                onClick={() => removeSize(size)}
                className="text-red-500 text-sm"
              >
                &times; {/* Cross icon to remove size */}
              </button>
            </div>
          ))}
        </div>
      )}
      {/* If custom size is selected, show input for meters */}
      {isInputOpen && (
        <div className="flex items-center mb-[20px]">
          <input
            type="text"
            placeholder="Size (meters)"
            value={manualSize}
            onChange={handleManualSizeChange}
            className="p-2 border rounded mr-2"
          />
          <button
            type="button"
            onClick={handleAddManualSize}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
