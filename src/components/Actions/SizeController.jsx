import React from "react";

const SizeController = ({ size, setSize, availableSizes }) => {

  return (
    <div className="size-controller">
      <div className="flex flex-col gap-[5px] text-[var(--tmp-txt)]">
        <p>Select Size: </p>
        <div>

          {availableSizes.map((availableSize) => (
            <button
              key={availableSize}
              className={`w-[40px] h-[40px] flex justify-center items-center bg-[var(--tmp-pri)] rounded-sm text-[15px] ${size === availableSize ? "border-2 border-[var(--tmp-sec)] " : ""}`}
              onClick={() => setSize(availableSize)}
            >
              {availableSize}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeController;
