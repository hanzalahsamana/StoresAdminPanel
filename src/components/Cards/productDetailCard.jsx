"use client";

import React, { useEffect } from "react";
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
import productDummy from "../../Assets/Images/productDummy.png";
import placeholderImage from "../../Assets/Images/placeholder-image.webp";
import StarRating from "../UI/starRating";
import { BiSolidCommentDetail } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import StatusCard from "./StatusCard";

const ProductDetailCard = ({ product }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setmainImage] = useState(0);
  const sizes = ConvertArray(product?.size || [])
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || '')
  const { loading } = useSelector((state) => state?.cartData || []);
  const { siteName } = useSelector((state) => state.siteName);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [displayImage, setDisplayImage] = useState(product?.displayImage);

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

  const getMatchingVariant = () => {
    return product.variants.find(variant => {
      return Object.entries(variant.options).every(([key, value]) => {
        return value === "any" || value === selectedOptions[key];
      });
    });
  };

  useEffect(() => { setDisplayImage(product?.displayImage) }, [product])

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
            <img src={displayImage} alt="" className="w-full brightness-[1.3]" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[...(product?.gallery || []), ...(product?.variants?.map(v => v.image) || [])].map((image, index) => (
              <div
                key={index}
                // onClick={}
                className={`bg-[#ffffff] w-[80px] rounded-[4px] h-[80px] flex justify-center p-1 items-center border ${index === 0 ? 'border-[1.5px] border-primaryC' : ''
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
              <BiSolidCommentDetail className="text-[#9e9e9e]" size={18} />
              {product?.ratings?.count} reviews
            </div>
          )}

          <StatusCard status={true} label={product?.status === "active" ? "In Stock" : "Out Of Stock"} className={'mt-[15px]'} />
          <div>
            {product?.variations.map(({ name, options }, index) => (
              <div key={index} className="pt-[20px]">
                <p className="text-gray-400 text-[14px] mb-1">Select {name}</p>
                <div className="flex gap-2">
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

            <p className={'text-[.85rem] text-red-600 mt-[20px] bg-red-100 p-2 '}>
              {product?.note}
            </p>
          )}
        </div>

        <div className="w-[280px] flex flex-col p-[20px] bg-white border-[1.3px] border-[#d2cece] rounded-[4px] customShadow h-[400px]">
          <div className="flex items-end gap-3">
            <p className="font-bold text-[28px]/[28px]">{product?.price} Rs</p>
            <p className="font-medium text-[18px]/[18px] line-through text-[#a5a5a5]">{product?.comparedAtPrice} Rs</p>
          </div>

          <QuantityControl
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            className={'mt-[30px]'}
          />

          <button
            disabled={!product?.stock ? true : false}
            onClick={handleAddToCart}
            className={`py-[7px] w-full mt-8 bg-[#0D6FFD] border-none text-[#ffffff] text-[16px] font-bold rounded-md  transition-all duration-300 hover:scale-105 ${!product?.stock ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? <ButtonLoader /> : 'Add To Cart'}
          </button>
          <button
            disabled={!product?.stock ? true : false}
            onClick={() => {
              handleAddToCart();
              router.push(`${getBasePath()}/checkout`);
            }}
            className={`py-[7px] w-full mt-3 bg-[#d6e6ff8e] border-none text-[#0D6FFD] text-[16px] font-bold rounded-md  transition-all duration-300 hover:scale-105 ${!product?.stock ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? <ButtonLoader /> : 'Buy It Now'}
          </button>

          <ul className="w-full text-[15px] font-medium border-t text-[#9e9b9b] font-se my-[20px] py-[10px] ">
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Vendor: {product?.vendor}</li>
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Material: Leather</li>
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Color: Purple</li>
            <li className="before:content-['•'] before:pr-1 mb-[2px]">Size: Large</li>
          </ul>

        </div>
      </div >
    </div >
  );
};

export default ProductDetailCard;




// const variations = [
//   {
//     name: "Condition",
//     options: ["Brand New", "Used", "Refurbished"],
//   },
//   {
//     name: "Color",
//     options: [
//       "#FF6B6B",   // Coral Red
//       "#FFD93D",   // Sunny Yellow
//       "#6BCB77",   // Mint Green
//       "#4D96FF",   // Sky Blue
//       "#9D4EDD",   // Purple Haze
//       "#F38BA0",   // Soft Pink
//       "#FFA07A",   // Light Salmon
//       "#00B8A9",   // Teal Green
//     ],
//   },
// ];

//  {
//     name: "Classic Cotton T-Shirt",
//     vendor: "UrbanWear",
//     price: 25,
//     comparedAtPrice: 35,
//     displayImage: "/images/products/tshirt-main.jpg",
//     gallery: ["/images/products/tshirt-1.jpg", "/images/products/tshirt-2.jpg"],
//     collections: ["60f7f3a5b6a0e024b0d0abcd"],
//     stock: 100,
//     status: "active",
//     description: "Soft and breathable cotton T-shirt, perfect for daily wear.",
//     metaTitle: "Cotton T-Shirt",
//     metaDescription: "Premium quality cotton t-shirt for everyday comfort.",
//     note:"Wash dark colors separately to avoid color bleeding.",
//     variations: [
//       {
//         name: "Color",
//         options: ["Red", "Blue", "Black"],
//       },
//       {
//         name: "Size",
//         options: ["S", "M", "L", "XL"],
//       },
//     ],
//     variants: [
//       {
//         sku: "TSHIRT-RED-M",
//         options: {
//           Color: "Red",
//           Size: "M",
//         },
//         stock: 10,
//         price: 25,
//         image: "/images/products/tshirt-red-m.jpg",
//       },
//     ],
//     storeRef: "60f7f3a5b6a0e024b0d0aaaa",
//     wantsCustomerReview: true,
//     ratings: {
//         average: 4,
//         count: 32,
//     },
//   },



