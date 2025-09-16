"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import DynamicTable from "./Table";

const OrderListTable = ({ limit = "all" }) => {
    const router = useRouter();
    const { orders, loading } = useSelector((state) => state?.orderData);

    const statusOptions = {
        pending: { bgColor: "#fef9c3", color: "#ca8a04" }, // yellow-700
        delivered: { bgColor: "#dcfce7", color: "#15803d" }, // green-700
        shipped: { bgColor: "#dbeafe", color: "#1d4ed8" }, // blue-700
        cancelled: { bgColor: "#fee2e2", color: "#b91c1c" }, // red-700
    };

    const getStatusStyles = (status) => statusOptions[status] || statusOptions["pending"];

    const extractedOrders = orders
        ?.slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest first
        .slice(0, limit === "all" ? orders.length : limit) // Apply limit
        .map(({ customerInfo, orderInfo, _id, createdAt }) => ({
            name: customerInfo?.firstName || "Unknown",
            total: orderInfo.total,
            _id,
            date: createdAt ? createdAt.split("T")[0] : "N/A",
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
        <DynamicTable
            columns={columns}
            data={extractedOrders}
            actions={actions}
            loading={loading}
            notFoundText="Currently, There are not any orders " />
    );
};

export default OrderListTable;
