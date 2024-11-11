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
  const [isOpen, setIsOpen] = useState(false);
  const { orders, loading } = useSelector((state) => state?.orderData);
  const statusOptions = ["Pending", "Completed", "Shipped", "Cancelled"];

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && orders?.length > 0 ? (
        <div className="p-2">
          <h1 className="text-center py-10">Orders List</h1>
          <div>
            <table className="overflow-x-auto min-w-full bg-white border border-gray-200 rounded-lg">
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
              <tbody className="cursor-pointer hover:bg-gray-100">
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
                      <td
                        className="py-4 px-6 text-gray-700 relative"
                        onClick={toggleDropdown}
                      >
                        <div className="cursor-pointer flex items-center gap-2">
                          {orderInfo.status}
                          <div
                            className={`transition-all ${
                              isOpen && "rotate-[-180deg]"
                            } text-sm`}
                          >
                            <FaChevronDown />
                          </div>
                        </div>

                        {isOpen && (
                          <div className="dropDown absolute top-10 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg w-32 z-10 p-4 pr-6">
                            {statusOptions
                              .filter((option) => option !== orderInfo.status)
                              .map((option) => (
                                <div
                                  key={option}
                                  // onClick={() => handleStatusSelect(option)}
                                  className="py-2 hover:text-[#DE513F] transition-all duration-200 cursor-pointer "
                                >
                                  {option}
                                </div>
                              ))}
                          </div>
                        )}
                      </td>
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
          <p className="text-xl">No Orders found</p>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute(Order);
