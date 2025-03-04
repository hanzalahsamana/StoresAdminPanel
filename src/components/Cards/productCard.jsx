"use client";
import { useState } from "react";
import styles from "../UI/style.module.css";
const ProductCard = ({ product }) => {
  
  const [imageUrl, setImageUrl] = useState(product?.images[0]);

  const handleMouseEnter = () => {
    setImageUrl(product?.images[1] || product?.images[0]  )
  };

  const handleMouseLeave = () => {
    setImageUrl(product?.images[0]);
  };
  return (
    <div
      className={`bg-white overflow-hidden ${styles.ProductCardContainer}`}
      key={product?._id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex items-center justify-center overflow-hidden">
        <img src={imageUrl} alt={product?.alt} className="w-full ratio" />
        <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-br-lg">
          {product?.discount}% OFF
        </span>
      </div>
      <div className="py-4">
        <h2 className="text-[16px] font-semibold mb-1">{product?.name}</h2>
        <h3 className="text-[10px] text-gray-600 my-2">{product?.brand}</h3>
        <div className="flex gap-2 items-end">
          <p className="text-gray-500 text-xs line-through">
            Rs. {product?.originalPrice.toFixed(2)} PKR
          </p>
          <p className="text-l font-bold text-gray-800">
            Rs. {product?.discountedPrice.toFixed(2)} PKR
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
