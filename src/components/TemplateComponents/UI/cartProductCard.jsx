"use client";
import React from "react";
import QuantityControl from "./quantityControl";
import { useDispatch, useSelector } from "react-redux";
import { addCartData, deleteCartData } from "@/Redux/CartData/cartDataSlice";

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { siteName } = useSelector((state) => state.siteName);

  const quantity = product?.quantity || 1;

  const incrementQuantity = () => {
    if (product?._id) {
      dispatch(addCartData({ addedProduct: { _id: product?._id, quantity: 1, selectedSize: product?.selectedSize }, siteName }));
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1 && product?._id) {
      dispatch(addCartData({ addedProduct: { _id: product?._id, quantity: -1, selectedSize: product?.selectedSize }, siteName }));
    }
  };
  return (
    <div className="flex items-start  border-t border-[#dbdbdb] max-[750px]:flex-wrap max-[750px]:items-center  py-8 px-4">

      <div className="flex w-1/2  max-[750px]:w-full">
        <img
          src={product?.images[0]}
          alt="Product"
          className="w-30 h-32 object-cover "
        />
        <div className="ml-4 flex flex-col gap-[4px]">
          <p className="text-[15px] mt-2 font-semibold text-gray-800">
            {product?.name}
          </p>
          <p className="text-gray-500 text-sm">
            Rs. {product?.discountedPrice.toFixed(2)}
          </p>
          <p className="text-gray-500 text-sm">type: {product?.type}</p>
          <p className="text-gray-500 text-sm">size: {product?.selectedSize}</p>
        </div>
      </div>

      <div className="w-1/4 max-[750px]:w-1/2 mt-[15px] mx-[10px] flex flex-col gap-[20px]">
        <QuantityControl
          quantity={quantity}
          increaseQuantity={incrementQuantity}
          decreaseQuantity={decrementQuantity}
        />
      </div>

      <div className="flex justify-end items-center w-1/4 max-[750px]:w-1/2 mt-[15px]">
        <p className="ml-3 text-[12px]  text-gray-800">
          <span className="text-lg">
            Rs. {(product.discountedPrice * quantity).toFixed(2)}

          </span>

        </p>

        <button
          className="ml-4 text-gray-600 hover:text-red-500"
          onClick={() => dispatch(deleteCartData({productId:product?._id, siteName}))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default CartProductCard;
