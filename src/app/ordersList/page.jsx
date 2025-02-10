"use client";

import { useState } from "react";
import { editOrderStatus } from "@/APIs/Order/editOrderStatus";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/loader";
import { orderLoading } from "@/Redux/Order/OrderSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "@/components/Tables/Table";

const Order = () => {
  const router = useRouter();
  const [openedIndex, setOpenedIndex] = useState(null);
  const { orders, loading } = useSelector((state) => state?.orderData);
  const { currUser } = useSelector((state) => state.currentUser);


  const dispatch = useDispatch()

  if (loading) {
    return <Loader />;
  }

  const handleStatusSelect = async (orderId, status) => {
    orderLoading(true)
    await editOrderStatus(dispatch, orderId, status, currUser?.brandName)
    orderLoading(false)
  }



  const statusOptions = {
    pending: { bgColor: "#fef9c3", color: "#ca8a04" }, // yellow-700
    delivered: { bgColor: "#dcfce7", color: "#15803d" }, // green-700
    shipped: { bgColor: "#dbeafe", color: "#1d4ed8" }, // blue-700
    cancelled: { bgColor: "#fee2e2", color: "#b91c1c" }, // red-700
  };
  

  const getStatusStyles = (status) => statusOptions[status] || statusOptions["pending"];

  const extractedOrders = orders.map(({ customerInfo, orderInfo, _id, createdAt }) => ({
    name: customerInfo?.firstName || "Unknown",
    total: orderInfo.total,
    _id,
    date: createdAt?.split("T")[0] || "N/A",
    status: { text: orderInfo.status, ...getStatusStyles(orderInfo.status) },
  }));

  const columns = [
    { key: "name", label: "Customer Name" },
    { key: "total", label: "Total" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", type: "status" },
    { key: "_id", label: "Order Id", type: 'id' },
  ];
  const actions = {
    redirect: (row) => { router.push(`/ordersDetails/${row._id}`) },
  };


  return (
    <div className="p-2">
      <div className="flex justify-between py-4 w-full items-center">
        <p className="text-center font-semibold text-black text-[30px]">
          Orders
        </p>

      </div>
      <div>
        <DynamicTable columns={columns} data={extractedOrders} actions={actions} loading={loading} notFoundText="Currently, There are not any orders " />
        {/* <table className="overflow-x-auto min-w-full bg-white border border-gray-200 rounded-lg">
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
                      onClick={() => )}
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

        </table> */}
      </div>
    </div >
  );
};

export default ProtectedRoute(Order);
