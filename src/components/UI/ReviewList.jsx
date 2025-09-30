import { formatRelativeTime } from "@/Utils/Formaters";
import React, { useState } from "react";
import StarRating from "./starRating";
import RatingBreakdown from "./RatingBreakdown";

const reviewsMaxLength = 8
const ReviewsList = ({ allReviews = [] }) => {
    const [showAll, setShowAll] = useState(false);
    // if (!allReviews || allReviews.length === 0) {
    //     return <p className="text-center text-gray-500">No reviews yet.</p>;
    // }
    const reviewsToShow = showAll ? allReviews : allReviews.slice(0, reviewsMaxLength);

    const toggleShow = () => setShowAll(!showAll);


    return (
        <div className="max-w-[1500px] w-full px-8 py-8  rounded-lg bg-[var(--tmp-pri)]">
            <div className="flex flex-col md:flex-row w-full justify-between mb-[30px]">
                <div>
                    <h2 className="text-3xl font-semibold">Customer Reviews</h2>
                    <h2 className="text-lg font-medium">Based on {allReviews?.length || 0} reviews </h2>
                </div>
                <RatingBreakdown reviews={allReviews} />
            </div>
            {allReviews.length === 0 ? (
                <p className="text-center text-gray-700 text-xl italic">No reviews yet.</p>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 ">
                    {reviewsToShow.map((review, index) => (
                        <div
                            key={index}
                            className="mb-4  bg-[#ffffff] rounded-md border-[1px] break-inside-avoid border-[#dedede] customShadow p-[12px]"
                        >
                            <div className="flex w-full justify-between items-end mb-[15px]">
                                <div className="flex gap-1 items-center">
                                    <div className="w-[35px] h-[35px] rounded-full overflow-hidden flex items-center justify-center">
                                        <span className="text-[28px]">
                                            {review.rating >= 5
                                                ? "😀"
                                                : review.rating >= 4
                                                    ? "😊"
                                                    : review.rating >= 3
                                                        ? "😐"
                                                        : review.rating >= 2
                                                            ? "🙁"
                                                            : "😠"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-start gap-1 justify-between ">
                                        <h3 className="font-medium text-lg/[18px]">
                                            {review.reviewTitle || "No Title"}
                                        </h3>
                                        <div className="flex gap-1 font-bold !text-[15px]/[15px] ">
                                            <StarRating className="!text-[15px]" rating={review?.rating} />
                                            {Number(review?.rating)?.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[14px]">
                                    {review?.createdAt && formatRelativeTime(review?.createdAt)}
                                </div>
                            </div>
                            <q className="text-black text-[16px]/[16px] text-center">{review.message}</q>
                            <p className="text-sm text-gray-500 italic mt-2">— {review.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {allReviews.length > reviewsMaxLength && (
                <div className="text-center mt-4">
                    <button
                        onClick={toggleShow}
                        className="text-blue-600 hover:underline focus:outline-none"
                    >
                        {showAll ? "Show Less" : `Show More (${allReviews.length - reviewsMaxLength} more)`}
                    </button>
                </div>
            )}

        </div>
    );
};

export default ReviewsList;
