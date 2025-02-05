import React from "react";

const ProductRecieptCard = ({ product }) => {
  return (
    <div className="flex items-center justify-between border-b py-[15px]">
      {product.map((product) => (
        <div key={product.name} className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <img
                className="w-[50px] h-[50px] max-w-[unset] rounded-md "
                src={product?.image}
                alt={product?.name}
              />
            </div>
            <div>
              <p className="text-[15px] text-textC">
                {product?.name.slice(0, 17)}...
              </p>
              <p className="text-[13px] text-textC">
                {product?.size}{" "}size
              </p>
            </div>

          </div>

          <div className="flex items-center justify-center rounded-lg bg-[#666666] text-white text-[12px] w-[40px] h-[20px] ">
            x{" "}{product.quantity}
          </div>

          <div className="pl-[10px]">
            <p className="text-[18px] text-black font-bold">
              Rs{" "}
              {product?.totalOfProduct}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductRecieptCard;
