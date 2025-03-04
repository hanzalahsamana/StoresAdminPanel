'use client'

import React, { useState } from "react";
import StarRating from "../UI/starRating";
import "./style.css";


const AddReviews = () => {
  const [reviews, setReviews] = useState({
    reviewTitle:"",
    rating:0,
    productId:"",
    message:"",
    name:"",
    email:"",
});
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const handleAddReview = (e) => {
    e.preventDefault();
    if (name && review) {
      setReviews([...reviews, { name, review }]);
      setName("");
      setReview("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-5">
      <div className="flex justify-between items-center my-[30px]">

        <h2 className="text-2xl text-center">Your Feedback Matters!</h2>
        <StarRating />
      </div>

      <form onSubmit={handleAddReview} className="mb-6">
        <div className="flex gap-8">
          <div className="my-4 w-1/2 relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="reviewInput w-full placeholder:text-center text-center px-4 py-2 border-b-[3px] border-[#000000] focus:outline-none"
            />
            <i className={`inputLine ${name && '!w-full'}`}></i>
          </div>
          <div className="my-4 w-1/2 relative flex items-center justify-center">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="reviewInput placeholder:text-center text-center w-full px-4 py-2 border-b-[3px] border-[#000000] focus:outline-none"
            />
            <i className={`inputLine ${name && '!w-full'}`}></i>
          </div>
        </div>
        <div className="my-4 relative flex items-center justify-center ">
          <textarea
            maxLength={5}
            name="review"
            cols={10}
            placeholder="Write your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="reviewInput w-full h-28 px-4 py-2 border-b-[3px] border-[#000000] focus:outline-none"
          />
          <i className={`inputLine ${review && '!w-full'}`}></i>
        </div>
        <button type="submit" className="flex justify-center py-[15px] w-full mt-6 bg-black text-[#e6e6e6] text-[16px]  transition-all duration-300 hover:scale-105">
          Share your Review
        </button>
      </form>
    </div>
  );
};

export default AddReviews;
