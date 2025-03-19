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
      className={`bg-[var(--tmp-pri)] overflow-hidden ${styles.ProductCardContainer}`}
      key={product?._id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex items-center justify-center overflow-hidden">
        <img src={imageUrl} alt={product?.alt} className="w-full ratio" />
        <span className="absolute bottom-2 left-2 bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-xs px-2 py-1 rounded-br-lg">
          {product?.discount}% OFF
        </span>
      </div>
      <div className="py-4">
        <h2 className="text-[16px] text-[var(--tmp-txt)] font-semibold ">{product?.name}</h2>
        <h3 className="text-[10px] text-[var(--tmp-ltxt)] ">{product?.brand}</h3>
        <div className="flex gap-2 items-center">
          <p className="text-[var(--tmp-ltxt)]  text-xs line-through">
            Rs. {product?.originalPrice.toFixed(2)} PKR
          </p>
          <p className="text-l font-bold text-[var(--tmp-txt)]">
            Rs. {product?.discountedPrice.toFixed(2)} PKR
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
