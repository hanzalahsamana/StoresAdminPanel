"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addCartData } from "@/Redux/CartData/cartDataSlice";
import { ConvertArray } from "@/Utils/CovertArray";
import { getBasePath } from "@/Utils/GetBasePath";
import QuantityControl from "../Actions/quantityControl";
import ButtonLoader from "../Loader/ButtonLoader";
import StatusCard from "./StatusCard";
import StarRating from "../UI/starRating";
import { BiSolidCommentDetail } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import pluralize from "pluralize";
import { getValidVariant } from "@/Utils/getValidVariant";

const ProductDetailCard = ({ product }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setmainImage] = useState(0);
  const sizes = ConvertArray(product?.size || [])
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || '')
  const { loading } = useSelector((state) => state?.cartData || []);
  const { store } = useSelector((state) => state.store);

  console.log(product, "⚱️⚱️⚱️");


  const [selectedOptions, setSelectedOptions] = useState({});
  const [displayImage, setDisplayImage] = useState(product?.displayImage);
  const [productDataAccToVariant, setProductDataAccToVariant] = useState({
    image: '',
    price: '',
    stock: '',

  });

  const increaseQuantity = () => {
    if (productDataAccToVariant?.stock && quantity >= productDataAccToVariant?.stock) {
      return toast.error("this product is limited stock")
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    dispatch(addCartData({ addedProduct: { productId: product?._id, quantity, selectedVariant: selectedOptions || {} }, storeId: store?._id }));
    setQuantity(1)
  };

  useEffect(() => {
    if (!product) return;
    const mergedData = getValidVariant(product, selectedOptions)
    setProductDataAccToVariant(mergedData);
  }, [selectedOptions, product]);


  useEffect(() => {
    if (product?.variations?.length > 0) {
      const defaultSelections = {};

      product.variations.forEach(variation => {
        if (variation.options.length > 0) {
          defaultSelections[variation.name] = variation.options[0];
        }
      });

      setSelectedOptions(defaultSelections);
    }
  }, [product]);

  useEffect(() => {
    console.log(selectedOptions, "🏷️🏷️🏷️");

  }, [selectedOptions])

  return (
    <div className={`flex justify-center py-[25px] px-[30px] bg-white w-full`}>
      <div className={`flex justify-center gap-6 w-full`}>
        <div className={`flex flex-col gap-2.5  w-[344px]`}>
          <div className="bg-[#f4f4f4] border border-[#dcdcdc] rounded-[4px] h-max">
            <img src={productDataAccToVariant?.image || product?.displayImage} alt="" className="w-full brightness-[1.3]" />
          </div>

          <div className="grid grid-cols-4 gap-2 flex-wrap">
            {[...(product?.gallery || []), ...(product?.variantRules?.map(v => v.image).filter(Boolean) || [])].map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setProductDataAccToVariant({
                    ...productDataAccToVariant,
                    image,
                  })
                }}
                className={`bg-[#ffffff] rounded-[4px]  w-[80px] h-[80px] flex justify-center p-1 items-center border cursor-pointer ${productDataAccToVariant?.image === image ? 'border-[1.5px] border-primaryC' : 'hover:border-gray-400'
                  }`}
              >
                <img src={image} alt="" className="w-full object-cover h-full brightness-[1.3]" />
              </div>
            ))}
          </div>


        </div>

        <div className={`flex-1 flex flex-col items-start`}>
          {/* <p className={`text-[14px] text-[var(--tmp-ltxt)]`}>{product.brand}</p> */}
          <h1 className="text-[18px]/[24px] max-w-[450px] font-medium">{product?.name || 'No Name Found'}</h1>
          {product?.wantsCustomerReview && (
            <div className="flex items-center mt-[10px] gap-2 text-[15px]/[15px]  text-[#6c6c6c]">
              <StarRating rating={product?.ratings?.average} disable={true} className={'!text-[15px]'} />
              {product?.ratings?.average}
              <GoDotFill className="text-[#e0e0e0]" />
              <p className="cursor-pointer hover:underline flex items-center gap-2">
                <BiSolidCommentDetail className="text-[#9e9e9e]" size={18} />
                {product?.ratings?.count} reviews
              </p>
            </div>
          )}

          <StatusCard
            status={productDataAccToVariant?.stock >= 1}
            label={
              productDataAccToVariant?.stock >= 1
                ? product?.showStock
                  ? `${productDataAccToVariant.stock} ${productDataAccToVariant?.stock === 1
                    ? product?.pronounce || 'piece'
                    : pluralize(product?.pronounce || 'piece')
                  } left`
                  : 'In Stock'
                : 'Out Of Stock'
            }
            className="mt-[15px]"
          />
          <div>
            {product?.variations.map(({ name, options }, index) => (
              <div key={index} className="pt-[20px]">
                <p className="text-gray-400 text-[14px] mb-1">Select {name}</p>
                <div className="flex flex-wrap gap-2">
                  {options.map((option, idx) => {
                    const isColor = name.toLowerCase() === "color";
                    return (
                      <div
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [name]: option,
                          }))
                        }
                        key={idx}
                        className={`bg-[#f4f4f4] cursor-pointer border-[1.5px] ${selectedOptions?.[name] === option ? "border-primaryC text-black" : "border-[#dcdcdcad] hover:border-[#c9c9c9ad] text-gray-500"
                          } font-medium px-2 py-2 text-[15px]/[15px] rounded-[5px] flex items-center gap-2`}
                      >
                        {isColor ? (
                          <span
                            className="w-[24px] h-[24px] rounded-full"
                            style={{ backgroundColor: option }}
                          ></span>
                        ) : null}
                        {!isColor && option}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {product?.note && (

            <p className={'text-[.85rem] text-red-600 mt-[30px] w-full bg-red-100 p-2 '}>
              {product?.note}
            </p>
          )}
        </div>

        <div className="w-[280px] flex flex-col p-[20px] bg-white border-[1.3px] border-[#e1dfdf] rounded-[4px] customShadow h-[400px]">
          <div className="flex items-end gap-3">
            <p className="font-bold text-[28px]/[28px]">{productDataAccToVariant?.price} Rs</p>
            <p className="font-medium text-[18px]/[18px] line-through text-[#a5a5a5]">{product?.comparedAtPrice} Rs</p>
          </div>

          <div className="flex gap-2 items-end">
            <QuantityControl
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              className={'mt-[30px]'}
            />
            <p className="text-[18px]">
              pieces
            </p>
          </div>

          <ul className="w-full text-[15px] font-medium border-b text-[#9e9b9b] font-se my-[20px] py-[10px] ">
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Vendor: {product?.vendor}</li>
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Material: Leather</li>
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Color: Purple</li>
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Size: Large</li>
          </ul>
          <button
            disabled={!product?.stock ? true : false || loading}
            onClick={handleAddToCart}
            className={`py-[7px] w-full mt-2 bg-[#0D6FFD] border-none text-[#ffffff] text-[16px] font-bold rounded-md  transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed`}
          >
            {loading ? <ButtonLoader /> : 'Add To Cart'}
          </button>
          <button
            disabled={!product?.stock ? true : false}
            onClick={() => {
              handleAddToCart();
              router.push(`${getBasePath()}/checkout`);
            }}
            className={`py-[7px] w-full mt-2 bg-[#d6e6ff8e] border-none text-[#0D6FFD] text-[16px] font-bold rounded-md  transition-all duration-300 hover:scale-105 ${!product?.stock ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? <ButtonLoader /> : 'Buy It Now'}
          </button>
        </div>
      </div >
    </div >
  );
};

export default ProductDetailCard;