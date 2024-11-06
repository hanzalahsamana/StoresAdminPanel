"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/loader";
import ProductModal from "@/components/productModal";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/APIs/Product/deleteProductData";

const ProductsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { products, productLoading } = useSelector(
    (state) => state.productData
  );
  const { currUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleDelete = (id) => {
    deleteProduct(currUser.brandName, id, dispatch);
  };
  return (
    <div>
      {productLoading ? (
        <Loader />
      ) : (
        <div className="p-2">
          <div className="flex justify-between w-full h-[50px] items-center">
            <p className="text-center py-4 font-semibold text-black text-xl">
              Products
            </p>
            <button
              onClick={toggleModal}
              className="p-2 flex gap-x-2 bg-black text-white rounded-lg font-semibold px-4 hover:bg-gray-700 transition-all duration-300"
            >
              <FaPlus />
              Add Product
            </button>
          </div>
          <div className="overflow-auto h-[calc(100vh-120px)] no-scrollbar">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    #ID
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Image
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold max-w-[200px] w-[200px]">
                    Product
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Inventory
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Type
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Collection
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Vendor
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="cursor-pointer">
                {products.length > 0 &&
                  products.map((product, index) => (
                    <tr key={product._id} className="border-b border-gray-200">
                      <td className="py-4 px-2 text-gray-700">
                        {" "}
                        #{product?._id?.slice(0, 6)}....
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        <img
                          src={product?.images[0]}
                          className="max-w-[50px] w-[50px] h-[50px]"
                          alt=""
                        />
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {product?.name}
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {product?.stock} in stock
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {product?.type}
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {product?.collectionName}
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {product?.brand}
                      </td>
                      <td className="py-4 px-2 text-red-600">
                        <div className="flex items-center gap-2">
                          <div onClick={() => handleDelete(product?._id)}>
                            <BsFillTrash3Fill />
                          </div>
                          <div className="text-blue-800 text-2xl">
                            <CiEdit />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productLoading={productLoading}
      />
    </div>
  );
};

export default ProtectedRoute(ProductsList);
