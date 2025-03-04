import React from "react";
import OrderRecieptCard from "../Cards/OrderRecieptCard";

const OrderRecipt = ({ products }) => {
  const { shipping, tax, discount, total } = products?.orderInfo;

  return (
    <div className="w-full max-w-[500px]">

      <div className="max-h-[70%] overflow-scroll no-scrollbar">
        {products.orderData?.map((item, index) => (
          <OrderRecieptCard key={item._id} product={item} />
        ))}
      </div>

      <div className="max-w-[500px] flex flex-col gap-2 py-[25px]">

        <p className="w-full flex justify-between text-[14px]">
          <span>Shipping Cost</span>
          <span className="text-[#6b7280]">Rs {shipping?.toFixed(2)}</span>
        </p>

        <p className="w-full flex justify-between text-[14px]">
          <span>Tax</span>
          <span className="text-[#6b7280]">{tax > 0 ? `Rs ${tax.toFixed(2)}` : "No Tax"}</span>
        </p>

        <p className="w-full flex justify-between text-[14px]">
          <span>Discount</span>
          <span className="text-[#6b7280]">{discount > 0 ? `Rs ${discount.toFixed(2)}` : "0%"}</span>
        </p>

        <p className="w-full flex justify-between text-[22px] font-bold mt-[10px]">
          <span>Total</span>
          <span className="">Rs {total?.toFixed(2)}</span>
        </p>

      </div>

    </div>
  );
};

export default OrderRecipt;
