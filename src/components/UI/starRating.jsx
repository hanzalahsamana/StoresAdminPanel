import React, { useState } from 'react';
import styles from './style.module.css';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";


const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(3);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className={`${styles.starRatingContainer} flex flex-row-reverse`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = totalStars - index;
        return (
          <span
            key={index}
            className={starValue <= rating ? styles.starFilled : styles.starEmpty}
            onClick={() => handleRating(starValue)}
          >
            {starValue <= rating? <FaStar/> :<CiStar/>}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
