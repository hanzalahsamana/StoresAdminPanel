'use client';
import React from 'react';
import QuantityControl from '../Actions/quantityControl';
import { useDispatch, useSelector } from 'react-redux';
import { addCartData, deleteCartData } from '@/Redux/CartData/cartDataSlice';

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const quantity = product?.quantity || 1;

  const incrementQuantity = () => {
    if (product?.productId) {
      dispatch(addCartData({ addedProduct: { productId: product?.productId, quantity: 1, selectedVariant: product?.selectedVariant }, storeId: store?._id }));
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1 && product?.productId) {
      dispatch(addCartData({ addedProduct: { productId: product?.productId, quantity: -1, selectedVariant: product?.selectedVariant }, storeId: store?._id }));
    }
  };

  return (
    <div className="flex items-start  border-y border-[var(--tmp-lBor)] max-[750px]:flex-wrap max-[750px]:items-center  py-8 px-4">
      <div className="flex w-1/2  max-[750px]:w-full">
        <img src={product?.image} alt="Product" className="w-[100px] h-[100px] object-contain " />
        <div className="ml-4 flex flex-col gap-[4px]">
          <p className="text-[15px] mt-2 font-semibold text-[var(--tmp-txt)]">{product?.name}</p>
          <p className="text-[var(--tmp-ltxt)] text-sm">Rs. {product?.price?.toFixed(2)}</p>
          <div className="flex gap-2">
            {product?.selectedVariant &&
              Object.keys(product?.selectedVariant).map((key, i) => (
                <p className="text-[var(--tmp-ltxt)] text-sm">
                  <span className="font-semibold">{key}: </span>
                  {product?.selectedVariant?.[key]}
                </p>
                // <p className="text-[var(--tmp-ltxt)] text-sm">size: {product?.selectedSize}</p>
              ))}
          </div>
        </div>
      </div>

      <div className="w-1/4 max-[750px]:w-1/2 mt-[15px] mx-[10px] flex flex-col gap-[20px]">
        <QuantityControl quantity={quantity} increaseQuantity={incrementQuantity} decreaseQuantity={decrementQuantity} />
      </div>

      <div className="flex justify-end items-center w-1/4 max-[750px]:w-1/2 mt-[15px]">
        <p className="ml-3 text-[12px]  text-[var(--tmp-txt)]">
          <span className="text-lg">Rs. {(product.price * quantity).toFixed(2)}</span>
        </p>

        <button className="ml-4 text-[var(--tmp-ltxt)] hover:text-red-500" onClick={() => dispatch(deleteCartData({ cartProductId: product?._id, storeId: store?._id }))}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
