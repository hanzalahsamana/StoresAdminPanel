"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/loader";
import ProductsRecipt from "@/components/productsRecipt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const Order = () => {
  const router = useRouter();
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const { orders, loading } = useSelector((state) => state?.orderData);

  if (loading) {
    return <Loader />;
  }

  // const totalProductCost = orders?.[0]?.orderData?.reduce((total, product) => {
  //   return total + product.discountedPrice * product.quantity;
  // }, 0);

  // console.log("totalProductCost", totalProductCost);
  // const shippingCost = 200;
  // const tax = 0;
  // const discount = 0;
  // const total = totalProductCost + shippingCost + tax - discount;

  return (
    <>
      {!loading && orders?.length > 0 ? (
        <div className="p-2">
          <h1 className="text-center py-10">Orders List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                    #
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                    Amount
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold min-w-[130px]">
                    DATE
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                    STATUS
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="cursor-pointer">
                {orders.map(
                  ({ createdAt, _id, orderInfo, customerInfo }, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200"
                      onClick={() => router.push(`/ordersDetails/${_id}`)}
                    >
                      <td className="py-4 px-6 text-gray-700 ">
                        #{_id.slice(0, 6)}....
                      </td>
                      <td className="py-4 px-6 text-gray-700 ">
                        {customerInfo?.firstName}
                      </td>

                      <td className="py-4 px-6 text-gray-700">
                        {orderInfo?.total}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {createdAt.split("T")[0]}
                      </td>
                      <td className="py-4 px-6 text-gray-700">Pending</td>
                      <td className="py-4 px-6 text-gray-700">
                        <FaArrowRight />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
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

export default ProtectedRoute(Order);
