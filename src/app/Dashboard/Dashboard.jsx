import { FetchAnalytics } from "@/APIs/Analytics/FetchAnalytics";
import LineCHart from "@/components/LineCHart";
import MapChart from "@/components/MapChart";
import Piechart from "@/components/Piechart";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(true)
  const products = useSelector((state) => state.productData.products);
  const orders = useSelector((state) => state.orderData.orders);
  const { analytics, analyticloading } = useSelector((state) => state.analytics);

  const dispatch = useDispatch()
  useEffect(() => {
    FetchAnalytics(dispatch)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Main Dashboard</h1>
        </div>

<div className="flex justify-evenly items-center w-full">

        <Piechart analytics={analytics} analyticsLoading={analyticloading} />
        <LineCHart/>
</div>
        <MapChart analytics={analytics} analyticsLoading={analyticloading}/>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Total Products
            </h3>
            <p className="text-2xl font-bold text-blue-500">{products?.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Total Orders
            </h3>
            <p className="text-2xl font-bold text-green-500">{orders?.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Pending Orders
            </h3>
            <p className="text-2xl font-bold text-red-500">12</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center py-4">

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Recent Views
            </h3>
            <div className="w-[200px] h-[35px] flex relative rounded-2xl bg-[#F3F4F6] cursor-pointer" onClick={() => setActiveTab(!activeTab)}>
              <div className={`absolute top-0 w-[50%] h-full rounded-2xl bg-[#DE513F] transition-all ${activeTab ? 'left-0' : 'left-[50%]'}`}>

              </div>
              <div className="font-semibold pointer-events-none text-[15px] w-1/2 h-[35px] bg-transparent z-10 flex justify-center items-center ">
                Pages
              </div>
              <div className="font-semibold pointer-events-none text-[15px] w-1/2 h-[35px] bg-transparent z-10 flex justify-center items-center ">
                Countries
              </div>

            </div>

          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4">#1234</td>
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">$120.00</td>
                <td className="px-6 py-4 text-green-500">Completed</td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-6 py-4">#1235</td>
                <td className="px-6 py-4">Jane Smith</td>
                <td className="px-6 py-4">$95.00</td>
                <td className="px-6 py-4 text-yellow-500">Pending</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Orders
          </h3>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4">#1234</td>
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">$120.00</td>
                <td className="px-6 py-4 text-green-500">Completed</td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-6 py-4">#1235</td>
                <td className="px-6 py-4">Jane Smith</td>
                <td className="px-6 py-4">$95.00</td>
                <td className="px-6 py-4 text-yellow-500">Pending</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>

        {/* Recent Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg text-gray-700">Product 1</h4>
              <p className="text-sm text-gray-500">Category: Electronics</p>
              <p className="text-sm text-gray-500">Price: $30.00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg text-gray-700">Product 2</h4>
              <p className="text-sm text-gray-500">Category: Clothing</p>
              <p className="text-sm text-gray-500">Price: $25.00</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg text-gray-700">Product 3</h4>
              <p className="text-sm text-gray-500">Category: Home Goods</p>
              <p className="text-sm text-gray-500">Price: $40.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
