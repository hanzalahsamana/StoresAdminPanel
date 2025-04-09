"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import OrderListTable from "@/components/Tables/OrderListTable";

const Order = () => {

  return (
    <div className="p-4 w-full">
      
      <div className="flex flex-col gap-2 justify-between w-full items-center bg-backgroundC p-4 rounded-md shadow-md">

        <div className="flex justify-between py-4 w-full items-center">
          <p className="text-center font-semibold text-TextC text-[30px]">
            Orders
          </p>

        </div>
        <div className="w-full">
          <OrderListTable />
        </div>
      </div >
    </div >
  );
};

export default ProtectedRoute(Order);
