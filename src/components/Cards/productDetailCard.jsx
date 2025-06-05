"use client";

import React from "react";
import styles from "../UI/style.module.css";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartData } from "@/Redux/CartData/cartDataSlice";
import { TbTruckDelivery } from "react-icons/tb";
import QuantityControl from "../Actions/quantityControl";
import { useRouter } from "next/navigation";
import SizeController from "../Actions/SizeController";
import { ConvertArray } from "@/Utils/CovertArray";
import { getBasePath } from "@/Utils/GetBasePath";
import ButtonLoader from "../Loader/ButtonLoader";

const ProductDetailCard = ({ product }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setmainImage] = useState(0);
  const sizes = ConvertArray(product?.size || [])
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || '')
  const { loading } = useSelector((state) => state?.cartData || []);
  const { siteName } = useSelector((state) => state.siteName);



  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {

    dispatch(addCartData({ addedProduct: { quantity, selectedSize, ...product }, siteName }));
    setQuantity(1)
  };


  console.log(product, "okay");


  return (
    <div className={`flex justify-center p-10 px-5 bg-white`}>
      <div className={`max-[900px]:flex-col flex justify-center gap-8 max-w-[1200px]`}>
        <div className={`flex gap-2.5 h-[400px]`}>
          <div className={`customScroll flex flex-col items-center gap-2.5 w-[105px] p-2.5 shadow-[inset_0px_0px_8px_#dadada]`}>
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => setmainImage(index)}
                alt={`thumbnail ${index + 1}`}
                className={`${mainImage === index && 'border-2 border-[var(--tmp-ltxt)]'} w-20 h-20 object-cover transition-all duration-200 ease-in-out cursor-pointer flex-shrink-0`}
              />
            ))}
          </div>
          <img
            src={product?.images?.[mainImage]}
            alt="Fabric"
            className={`max-[900px]:max-w-full flex-1 max-w-[450px] object-contain w-full h-auto`}
          />
        </div>

        <div className={`flex-1`}>
          <p className={`text-[14px] text-[var(--tmp-ltxt)]`}>{product.brand}</p>
          <h1 className="text-[14px] my-[10px]">{product.name}</h1>
          
          <div className={styles.priceSection}>
            <span className={styles.strikeThrough}>
              Rs {product?.originalPrice?.toFixed(2)} PKR
            </span>
            <span className={styles.discountedPrice}>
              Rs {product?.discountedPrice?.toFixed(2)} PKR
            </span>
            <span className={styles.discountTag}>{product?.discount}% OFF</span>
          </div>
          <p>
            Type: <strong>{product?.type}</strong>
          </p>
          <p
            className={
              product?.stock || product?.status ? `${styles.InStock}` : `${styles.OutStock}`
            }
          >
            {product?.stock || product?.status ? "In Stock" : "Out Of Stock"}
          </p>

          <div className="flex flex-col gap-[20px]">
            <QuantityControl
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            <SizeController availabelSizes={sizes } size={selectedSize} setSize={setSelectedSize} />
          </div>

          <div className={styles.productDetail}>
            {/* <p>
              Size: <strong>{product?.size} meter</strong>
            </p> */}
          </div>

          <div className={`flex-col sm:flex-row ${styles.buttons}`}>
            <button
              disabled={!product?.stock ? true : false}
              onClick={handleAddToCart}
              className={`py-[15px] w-full mt-3 bg-white border-black border-[2px] text-[#000000] text-[16px]  transition-all duration-300 hover:scale-105 ${!product?.stock ? 'cursor-not-allowed' : ''}`}
            >
              {loading ? <ButtonLoader /> : 'Add To Cart'}
            </button>
            <button disabled={!product?.stock ? true : false} onClick={() => {
              handleAddToCart();
              router.push(`${getBasePath()}/checkout`);

            }}
            className={`py-[15px] overflow-hidden w-full mt-3 bg-black text-[#e6e6e6] text-[16px]  transition-all duration-300 hover:scale-105 ${!product?.stock ? 'cursor-not-allowed' : ''}`}>
            Buy It Now
          </button>
        </div>
        <p className={styles.note}>
          *Please note that the actual color of the fabric may vary slightly
          due to photography lighting and screen settings.
        </p>

        <div className={styles.deliveryInfo}>
          <p className="flex gap-2 items-center">
            <TbTruckDelivery className="text-xl" /> Delivery in 2-3 working
            days
          </p>
        </div>
      </div>
    </div>
    </div >
  );
};

export default ProductDetailCard;