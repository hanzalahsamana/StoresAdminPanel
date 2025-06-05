"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import OrderListTable from "@/components/Tables/OrderListTable";

const Order = () => {

  return (
    <BackgroundFrame>
      <div className="flex flex-col gap-2 justify-between w-full items-center bg-backgroundC p-4 rounded-md border border-borderC shadow-sm ">

        <div className="flex justify-between w-full items-center">
          <p className="text-center font-semibold text-TextC text-[30px]">
            Orders
          </p>

        </div>
        <div className="w-full">
          <OrderListTable />
        </div>
      </div >
    </BackgroundFrame>
  );
};

export default Order;
