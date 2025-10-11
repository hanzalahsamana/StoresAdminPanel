'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addCartData } from '@/Redux/CartData/cartDataSlice';
import { ConvertArray } from '@/Utils/MiniUtils';
import { getBasePath } from '@/Utils/GetBasePath';
import QuantityControl from '../Actions/quantityControl';
import ButtonLoader from '../Loader/ButtonLoader';
import StatusCard from './StatusCard';
import StarRating from '../UI/starRating';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { GoDotFill } from 'react-icons/go';
import { toast } from 'react-toastify';
import pluralize from 'pluralize';
import { getValidVariant } from '@/Utils/getValidVariant';
import { poppins } from '@/Utils/ApplyTheme';
import { formatNumberWithCommas } from '@/Utils/Formaters';
import { FaArrowRightLong } from 'react-icons/fa6';
import Button from '../Actions/Button';
import { createCheckoutSession } from '@/APIs/Checkout/Checkout';

const ProductDetailCard = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setmainImage] = useState(0);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const sizes = ConvertArray(product?.size || []);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || '');
  const { loading } = useSelector((state) => state?.cartData || []);
  const { store } = useSelector((state) => state.store);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [displayImage, setDisplayImage] = useState(product?.displayImage);
  const [productDataAccToVariant, setProductDataAccToVariant] = useState({
    image: '',
    price: '',
    stock: '',
  });

  const increaseQuantity = () => {
    if (productDataAccToVariant?.stock && quantity >= productDataAccToVariant?.stock) {
      return toast.error('this product is limited stock');
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    dispatch(addCartData({ addedProduct: { productId: product?._id, quantity, selectedVariant: selectedOptions || {} }, storeId: store?._id }));
    setQuantity(1);
  };

  const handleBuyNow = async () => {
    try {
      setBuyNowLoading(true)
      const responce = await createCheckoutSession(store?._id, {
        cartItems: [
          {
            productId: product?._id,
            quantity,
            selectedVariant: selectedOptions || {},
          },
        ],
      });

      router.push(`${getBasePath()}/checkout/${responce.token}`);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      setBuyNowLoading(false)
    }
  };

  useEffect(() => {
    if (!product) return;
    const mergedData = getValidVariant(product, selectedOptions);
    setProductDataAccToVariant(mergedData);
  }, [selectedOptions, product]);

  useEffect(() => {
    if (product?.variations?.length > 0) {
      const defaultSelections = {};

      product.variations.forEach((variation) => {
        if (variation.options.length > 0) {
          defaultSelections[variation.name] = variation.options[0];
        }
      });

      setSelectedOptions(defaultSelections);
    }
  }, [product]);

  return (
    <div className={`flex justify-center py-[25px] px-[30px] bg-[var(--tmp-pri)] w-full`}>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-[50px] w-full max-w-[1200px]`}>
        <div className={`flex flex-col gap-2.5 w-full space-y-6`}>
          <div className="bg-[var(--tmp-pri)] border border-[var(--tmp-lBor)] rounded-[4px] h-max overflow-hidden">
            <img src={productDataAccToVariant?.image || product?.displayImage} alt="" className="w-full " />
          </div>
          

          <div className="grid grid-cols-6 gap-4 flex-wrap">
            {[...(product?.gallery || []), ...(product?.variantRules?.map((v) => v.image).filter(Boolean) || [])].map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setProductDataAccToVariant({
                    ...productDataAccToVariant,
                    image,
                  });
                }}
                className={`rounded-[4px]  w-[80px] h-[80px] flex justify-center items-center border border-[var(--tmp-lBor)] cursor-pointer ${productDataAccToVariant?.image === image ? 'border-[1.5px] border-primaryC' : 'hover:border-gray-400'
                  }`}
              >
                <img src={image} alt="" className="w-full object-cover h-full brightness-[1.3]" />
              </div>
            ))}
          </div>
        </div>

        <div className={`flex-1 flex flex-col items-start space-y-6`}>
          {/* <p className={`text-[14px] text-[var(--tmp-ltxt)]`}>{product.brand}</p> */}
          <h1 className={`text-[36px]/[40px] tracking-wider text-[var(--tmp-txt)] font-black font-[inter]`}>{product?.name || 'Unknown Product'}</h1>
          {product?.wantsCustomerReview && (
            <div className="flex items-center gap-2 text-[15px]/[15px]  text-[#6c6c6c]">
              <StarRating rating={product?.ratings?.average} disable={true} className={'!text-[15px]'} />
              {product?.ratings?.average}
              <GoDotFill className="text-[#e0e0e0]" />
              <p className="cursor-pointer hover:underline flex items-center gap-2">
                <BiSolidCommentDetail className="text-[#9e9e9e]" size={18} />
                {product?.ratings?.count} reviews
              </p>
            </div>
          )}

          <div className="flex items-end gap-3">
            <p className="font-bold text-[28px]/[28px] text-[var(--tmp-txt)]">{formatNumberWithCommas(productDataAccToVariant?.price, 0)}</p>
            <p className="font-normal text-[20px]/[20px] line-through text-[var(--tmp-txt)]">{formatNumberWithCommas(product?.comparedAtPrice, 0)}</p>
          </div>

          <StatusCard
            status={productDataAccToVariant?.stock >= 1}
            label={
              productDataAccToVariant?.stock >= 1
                ? product?.showStock
                  ? `${productDataAccToVariant.stock} ${productDataAccToVariant?.stock === 1 ? product?.pronounce || 'piece' : pluralize(product?.pronounce || 'piece')} left`
                  : 'In Stock'
                : 'Out Of Stock'
            }
            className="mt-3"
          />

          <div className="flex gap-2 items-end">
            <QuantityControl quantity={quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
            {/* <p className="text-[18px]/[18px] capitalize text-[var(--tmp-wtxt)]">pieces</p> */}
          </div>

          {product?.variations.map(({ name, options }, index) => (
            <div key={index} className="">
              <p className="text-[var(--tmp-txt)] text-[16px] mb-2">Select {name}</p>
              <div className="flex flex-wrap gap-2">
                {options.map((option, idx) => {
                  const isColor = name.toLowerCase() === 'color';
                  return (
                    <div
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [name]: option,
                        }))
                      }
                      key={idx}
                      className={`bg-[var(--tmp-acc)] cursor-pointer border-[1.5px] ${selectedOptions?.[name] === option ? 'border-primaryC text-[var(--tmp-txt)]' : 'border-[var(--tmp-lBor)] hover:border-[#c9c9c9ad] text-[var(--tmp-ltxt)]'
                        } font-medium px-2 py-2 text-[13px]/[13px] rounded-[5px] flex items-center gap-2`}
                    >
                      {isColor ? <span className="w-[24px] h-[24px] rounded-full" style={{ backgroundColor: option }}></span> : <span className="px-1">{option}</span>}
                      {/* {!isColor && } */}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="w-full flex flex-col gap-4">
            <Button
              disabled={!product?.stock ? true : false || loading}
              action={handleAddToCart}
              loading={loading}
              active={!loading || !buyNowLoading}
              variant="store"
              label="Add To Cart"
              className="font-bold  transition-all duration-300 hover:scale-105 !h-[50px]"
              size=""
            />
            <Button
              disabled={!product?.stock ? true : false || loading}
              action={handleBuyNow}
              loading={buyNowLoading}
              active={!loading || !buyNowLoading}
              variant="store"
              label="Buy It Now "
              className="!text-[var(--tmp-ltxt)] !bg-transparent border border-[var(--tmp-lBor)] font-bold  transition-all duration-300 hover:scale-105 !h-[50px]"
              size=""
            />
          </div>

          <p className="text-[var(--tmp-txt)] text-lg" dangerouslySetInnerHTML={{ __html: product?.description }}></p>

          {product?.note && (
            <p className={'text-[.85rem] text-[var(--tmp-txt)] mt-[30px] w-full border border-red-500/60 bg-red-500/10 text-red-500  p-2 '}>
              <span className="mr-2 font-semibold">Note:</span> {product?.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
