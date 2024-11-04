import React from "react";

const ProductRecieptCard = ({ product }) => {
  console.log("product", product);
  return (
    <>
      <div className="flex items-center justify-between border-b py-[15px]">
        {product.map((product, index) => {
          return (
            <div key={product.alt}>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <img
                    className="w-[70px] h-[70px] max-w-[unset] rounded-md "
                    src={product?.images?.[0]}
                    alt={product?.alt}
                  />
                  <div className="flex items-center justify-center rounded-full bg-[#666666] text-white text-[12px] absolute right-[-7px] top-[-7px] w-[20px] h-[20px] ">
                    {product.quantity}
                  </div>
                </div>
                <div>
                  <p className="text-[15px] text-[#1f1f1f] mb-[10px] ">
                    {product?.name}
                  </p>
                  <p className="text-[13px] text-[#1f1f1f]  ">
                    {product?.size}
                  </p>
                </div>
              </div>
              <div className="pl-[10px]">
                <p className="text-[14px] text-[#1f1f1f]">
                  Rs{" "}
                  {(product?.discountedPrice * product?.quantity)?.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductRecieptCard;
