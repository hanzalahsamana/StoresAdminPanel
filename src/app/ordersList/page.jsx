"use client";

import { editOrderStatus } from "@/APIs/Order/editOrderStatus";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/loader";
import ProductsRecipt from "@/components/productsRecipt";
import { orderLoading } from "@/Redux/Order/OrderSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const router = useRouter();
  const [openedIndex, setOpenedIndex] = useState(null);
  const { orders, loading } = useSelector((state) => state?.orderData);
  const { currUser } = useSelector((state) => state.currentUser);
  const statusOptions = [
    { status: "pending", color: "#eab308" },
    { status: "delivered", color: "#22c55e" },
    { status: "shipped", color: "#3b82f6" },
    { status: "cancelled", color: "#ef4444" }
  ]

  const extractColor = (status) => {
    const { color } = statusOptions.find(item => item.status === status) || '#eab308';
    return color
  }
  const dispatch = useDispatch()

  if (loading) {
    return <Loader />;
  }

  const handleStatusSelect = async (orderId, status) => {
    orderLoading(true)
    await editOrderStatus(dispatch, orderId, status, currUser?.brandName)
    orderLoading(false)
  }

  return (
    <>
        <div className="">
          <h1 className="text-center text-[28px] py-10">Orders List</h1>
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
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-4 px-6 text-center text-gray-700"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map(
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenedIndex(
                              typeof openedIndex === "number" ? null : index
                            );
                          }}
                        >
                          <div
                            className="cursor-pointer flex items-center gap-2"
                            style={{ color: extractColor(orderInfo.status) }}
                          >
                            {orderInfo.status}
                            <div
                              className={`transition-all ${openedIndex === index && "rotate-[-180deg]"
                                } text-sm`}
                            >
                              <FaChevronDown />
                            </div>
                          </div>

                          {openedIndex === index && (
                            <div className="dropDown absolute top-10 bg-[#F5F5F5] border border-gray-300 rounded-lg shadow-lg w-32 z-10 p-4 pr-6">
                              {statusOptions
                                .filter(({ status }) => status !== orderInfo.status)
                                .map(({ status, color }) => (
                                  <div
                                    key={status}
                                    onClick={() => handleStatusSelect(_id, status)}
                                    style={{ color: color }}
                                    className="py-2 opacity-[0.6] transition-all duration-200 cursor-pointer"
                                  >
                                    {status}
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
                  )
                )}
              </tbody>

            </table>
          </div>
        </div>

    </>
  );
};

export default ProtectedRoute(Order);
