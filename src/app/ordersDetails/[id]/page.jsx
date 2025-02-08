"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import CustomerInfo from "@/components/CustomerInfo";
import Loader from "@/components/loader";
import ProductsRecipt from "@/components/productsRecipt";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { orders, loading } = useSelector((state) => state?.orderData);
  const { id } = useParams();

  if (loading) {
    return <Loader />;
  };

  console.log("gayaa",orders);
  
  const order = orders?.find((order) => order._id === id);
  
  if (!order || orders.length === 0) {
    console.log("gaya");
    return (
      <div className="flex justify-center items-center h-[calc(100vh-50px)]">
        <h1>No Orders found</h1>
      </div>
    )
  };


  // const order = {
  //   createdAt: "2024-12-03T10:56:11.920Z",
  //   customerInfo: {
  //     address: "Ut illo blanditiis e",
  //     appartment: "Nisi labore in qui a",
  //     city: "Animi necessitatibu",
  //     country: "Accusamus incididunt",
  //     email: "boxe@mailinator.com",
  //     firstName: "Marny",
  //     lastName: "Strong",
  //     method: "COD",
  //     phone: "+1 (499) 836-2763",
  //     postalCode: 55,
  //   },
  //   from: "Hannan Fabrics",
  //   orderData: [
  //     {
  //       image: "https://res.cloudinary.com/duaxitxph/image/upload/v1729245284/sja5sztlyleoxlizyrc0.jpg",
  //       name: "Carol Light Blue - 100% Pure Cotton Unstitched Fabric",
  //       quantity: 4,
  //       totalOfProduct: 13000,
  //       _id: "6712306598aff7829704dc44",
  //     },
  //   ],
  //   orderInfo: {
  //     discount: 0,
  //     shipping: 200,
  //     status: "shipped",
  //     tax: 0,
  //     total: 13200,
  //   },
  //   to: "Hanzalah Samana",
  //   updatedAt: "2024-12-30T10:46:13.201Z",
  //   __v: 0,
  //   _id: "674ee3cb50325beab4552987",
  // };

  return (
    <div className="flex justify-center items-center p-0 w-full bg-backgroundC">
      <div className="flex md:flex-row flex-col-reverse gap-4 rounded-lg w-full h-full px-4 py-6">

        <div className={`bg-backgroundC w-full p-[10px 24px] max-[700px]:py-[0px]`}>
          <ProductsRecipt products={order} />
        </div>

        <div className="w-full bg-[#f9fafb] p-6 rounded-lg">
          <CustomerInfo order={order} />
        </div>

      </div>

    </div>
  );
};

export default ProtectedRoute(OrderDetails);
