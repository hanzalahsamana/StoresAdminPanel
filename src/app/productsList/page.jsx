"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const { products, productLoading } = useSelector(
    (state) => state.productData
  );
  return (
    <>
      {productLoading ? (
        <Loader />
      ) : (
        <div className="p-2">
          <div className="flex justify-between w-full h-[50px] items-center">
            <p className="text-center py-4 font-semibold text-black text-xl">
              Products
            </p>
            <button className="p-2 flex gap-x-2 bg-black text-white rounded-lg font-semibold px-4 hover:bg-gray-700 transition-all duration-300">
              <FaPlus />
              Add Product
            </button>
          </div>
          <div className="overflow-auto h-[calc(100vh-100px)] no-scrollbar">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                    #
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold"></th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold max-w-[200px] w-[200px]">
                    Product
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold min-w-[130px]">
                    Inventory
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                    Type
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                    Vendor
                  </th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="cursor-pointer">
                {products.length > 0 &&
                  products.map((product, index) => (
                    <tr key={product._id} className="border-b border-gray-200">
                      <td className="py-4 px-6 text-gray-700">
                        {" "}
                        #{product._id.slice(0, 6)}....
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <img
                          src={product.images[0]}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {product.name}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {product.stock} in stock
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {product.type}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {product.brand}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <FaArrowRight />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute(ProductsList);
