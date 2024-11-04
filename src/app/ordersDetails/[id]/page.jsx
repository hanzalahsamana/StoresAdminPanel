"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import CustomerInfo from "@/components/CustomerInfo";
import Loader from "@/components/loader";
import ProductsRecipt from "@/components/productsRecipt";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const router = useRouter();
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const { orders, loading } = useSelector((state) => state?.orderData);
  const { id } = useParams();
  const order = orders?.find((order) => order._id === id);

  if (loading) {
    return <Loader />;
  }

  const totalProductCost = order?.orderData?.reduce((total, product) => {
    return total + product.discountedPrice * product.quantity;
  }, 0);

  const shippingCost = 200;
  const tax = 0;
  const discount = 0;
  const total = totalProductCost + shippingCost + tax - discount;

  return (
    <>
      {!loading && order ? (
        <div className="flex w-full max-[700px]:flex-col-reverse">
          <div className="w-full bg-white p-2 h-[calc(100vh-50px)]">
            <CustomerInfo id={id} />
          </div>
          <div
            className={`bg-[#F5F5F5] w-full p-[30px] lg:h-[calc(100vh-50px)] max-[700px]:py-[0px] ${
              cartIsVisible ? "max-[700px]:h-auto" : "max-[700px]:h-[60px]"
            } transition-all duration-500 max-[700px]:overflow-hidden`}
          >
            <div className="h-[60px] w-full hidden max-[700px]:flex justify-between items-center">
              <p
                className="flex items-center gap-2 text-[#299ae0]"
                onClick={() => setCartIsVisible(!cartIsVisible)}
              >
                Show Order summary{" "}
                {cartIsVisible ? <FaChevronUp /> : <FaChevronDown />}
              </p>
              <p className="text-[#252525]">Rs {total?.toFixed(2)}</p>
            </div>
            <div className="h-[100%]">
              <div className="max-h-[70%] overflow-scroll no-scrollbar">
                <ProductsRecipt products={order} />
              </div>
              <div className="max-w-[500px] flex flex-col gap-2 py-[25px]">
                <p className="w-full flex justify-between text-[14px]  font-semibold">
                  <span>Total Product Cost</span>
                  <span>Rs {totalProductCost?.toFixed(2)}</span>
                </p>
                <p className="w-full flex justify-between text-[14px]  font-semibold">
                  <span>Shipping Cost</span>
                  <span>Rs {shippingCost?.toFixed(2)}</span>
                </p>
                <p className="w-full flex justify-between text-[14px]  font-semibold">
                  <span>Tax</span>
                  <span>{tax > 0 ? `Rs ${tax?.toFixed(2)}` : "---"} </span>
                </p>
                <p className="w-full flex justify-between text-[14px]  font-semibold">
                  <span>Discount</span>
                  <span>
                    {discount > 0 ? `Rs ${discount?.toFixed(2)}` : "---"}{" "}
                  </span>
                </p>
                <p className="w-full flex justify-between text-[18px]  font-semibold mt-[10px]">
                  <span>Total</span>
                  <span>Rs {total?.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-50px)]">
          <h1>No Orders found</h1>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute(OrderDetails);
