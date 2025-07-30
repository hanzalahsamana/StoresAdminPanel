"use client";
import { useEffect, useState } from "react";
import styles from "../UI/style.module.css";
import Link from "next/link";
import { getBasePath } from "@/Utils/GetBasePath";
import { motion } from "framer-motion";  // Import Framer Motion

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [failedImages, setFailedImages] = useState(new Set());

  const handleMouseEnter = () => {
    const hoverImage = product?.images?.[1];
    if (hoverImage && !failedImages.has(hoverImage)) {
      setCurrentImage(hoverImage);
    }
  };

  const handleMouseLeave = () => {
    const mainImage = product?.images?.[0];
    if (mainImage && !failedImages.has(mainImage)) {
      setCurrentImage(mainImage);
    }
  };

  const handleImageError = () => {
    setFailedImages(prev => new Set(prev).add(currentImage));
  };

  useEffect(() => {
    if (product?.images?.[0]) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  const isImageValid = currentImage && !failedImages.has(currentImage);

  return (
    <Link
      className="cursor-pointer"
      key={product._id}
      href={`${getBasePath()}/products/${product._id}`}
    >
      <motion.div
        className={`bg-[var(--tmp-pri)] overflow-hidden ${styles.ProductCardContainer}`}
        key={product?._id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative flex items-center justify-center overflow-hidden min-h-[200px] bg-gray-200">
          {isImageValid ? (
            <img
              src={currentImage}
              alt={product?.alt || product?.name}
              className="w-full h-auto object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-300 text-gray-700 text-sm">
              Image Not Found
            </div>
          )}
          {product?.discount && (
            <span className="absolute bottom-2 left-2 bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-xs px-2 py-1 rounded-br-lg">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="py-4">
          <h2 className="text-[16px] text-[var(--tmp-txt)] font-semibold">
            {product?.name}
          </h2>
          <h3 className="text-[10px] text-[var(--tmp-ltxt)]">{product?.brand}</h3>
          <div className="flex gap-2 items-center">
            <p className="text-l font-bold text-[var(--tmp-txt)]">
              Rs. {product?.price?.toFixed(2)} PKR
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;