import React from "react";

const SizeController = ({ size, setSize, availabelSizes }) => {

  return (
    <div className="size-controller">
      <div className="flex flex-col gap-[5px] text-[var(--tmp-txt)]">
        <p>Select Size: </p>
        <div className="flex gap-1">

          {availabelSizes.map((availabelSize) => (
            <button
              key={availabelSize}
              className={`w-[40px] h-[40px] flex justify-center items-center bg-[var(--tmp-pri)] rounded-sm text-[15px] ${size === availabelSize ? "border-2 border-[var(--tmp-sec)] " : ""}`}
              onClick={() => setSize(availabelSize)}
            >
              {availabelSize}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeController;
