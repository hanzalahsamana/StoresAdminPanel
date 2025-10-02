import React from 'react';

const MetricsGrid = ({ data, prefix = '', suffix = '' }) => {
  return (
    <div className="flex justify-around items-center p-6 w-full">
      {data?.map((item, index) => (
        <div key={index} className="flex flex-col items-center text-[#434343]">
          <item.icon size={70} />
          <p className="text-[14px]/[16px] text-[#99abb4] mt-2">{item.name}</p>
          <div className="flex justify-center gap-2 items-center">
            <p className="text-textTC">
              {prefix} {item.value} {suffix}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
