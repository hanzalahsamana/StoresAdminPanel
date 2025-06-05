import React from "react";
import { FaStar } from "react-icons/fa6";

const RatingBreakdown = ({ reviews }) => {
  const total = reviews.length;

  // Count reviews by rating
  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, rating) => {
    acc[rating] = reviews.filter((r) => r.rating === rating).length;
    return acc;
  }, {});

  return (
    <div className="w-max">
      {Array.from({ length: 5 }, (_, i) => {
        const rating = 5 - i;
        const count = ratingCounts[rating] || 0;
        const percent = total > 0 ? Math.round((count / total) * 100) : 0;

        return (
          <div key={rating} className="flex items-center ">
            <div className="flex gap-[1px] w-[80px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  size={12}
                  fill={index < rating ? "#facc15" : "#e5e7eb"}
                  stroke="#facc15"
                />
              ))}
            </div>

            <div className="w-[100px] bg-gray-200 h-[10px] mx-2 rounded relative">
              <div
                className="h-[10px] bg-yellow-400 rounded"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <span className="text-sm text-gray-600 w-[30px]">{percent}%</span>
            <span className="text-sm text-gray-600 ml-1">({count})</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
