import React, { useState } from 'react';
import styles from './style.module.css';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";


const StarRating = ({ totalStars = 5, disable = false, rating, setRating = ()=>{} , className }) => {

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className={`${styles.starRatingContainer} ${disable && 'pointer-events-none'} flex items-center gap-1 flex-row-reverse`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = totalStars - index;
        return (
          <span
            key={index}
            className={`${starValue <= rating ? styles.starFilled : styles.starEmpty} ${className}`}
            onClick={() => handleRating(starValue)}
          >
            {starValue <= rating ? <FaStar /> : <FaStar />}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
