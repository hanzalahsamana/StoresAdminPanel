import React from "react";

const DataSelectionList = ({ data = [], selectedData = [], setSelectedData }) => {
  const handleSelect = (id) => {
    if (selectedData.includes(id)) {
      setSelectedData(selectedData.filter((item) => item !== id));
    } else {
      setSelectedData([...selectedData, id]);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-xl border p-2 space-y-2 bg-white">
      {data.map((item) => {
        const isSelected = selectedData.includes(item._id);

        return (
          <div
            key={item._id}
            className={`flex items-center justify-between rounded-lg p-2 border transition cursor-pointer ${isSelected ? "border-blue-500 shadow-sm" : "border-gray-200"
              }`}
            onClick={() => handleSelect(item._id)}
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.subText}</p>
              </div>
            </div>
            <div className="pr-2">
              {isSelected ? (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              ) : (
                <div className="w-5 h-5 border border-gray-300 rounded-sm"></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataSelectionList;
