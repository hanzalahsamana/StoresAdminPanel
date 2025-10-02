'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import OrderRecipt from '@/components/UI/OrderRecipt';
import CustomerInfoTable from '@/components/Tables/CustomerInfoTable';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Loader from '@/components/Loader/loader';

const OrderDetails = () => {
  const { orders, loading } = useSelector((state) => state?.orderData);
  const { orderid } = useParams();

  if (loading) {
    return <Loader />;
  }

  const order = orders?.find((order) => order._id === orderid);

  if (!order || orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)]">
        <h1>No Orders found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-0 w-full max-w-[1100px]  bg-backgroundC">
      <div className="flex md:flex-row flex-col-reverse gap-4 rounded-lg w-full h-full px-4 py-6">
        <div className={`bg-backgroundC w-full p-[10px 24px] max-[700px]:py-[0px]`}>
          <OrderRecipt products={order} />
        </div>

        <div className="w-full bg-[#f9fafb] p-6 rounded-lg">
          <CustomerInfoTable order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
