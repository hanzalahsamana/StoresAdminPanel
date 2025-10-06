'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Loader from '@/components/Loader/loader';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import CustomerInfoTable from '@/components/Tables/CustomerInfoTable';
import OrderRecipt from '@/components/UI/OrderRecipt';
import { fetchOrderData } from '@/APIs/Order/getOrderData';

const OrderDetails = () => {
  const { loading } = useSelector((state) => state?.orderData);
  const { currUser } = useSelector((state) => state?.currentUser);
  const { id, store_id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const order = await fetchOrderData(currUser?.token, store_id, id);
    setOrder(order);
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
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
