"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/loader";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "@/APIs/Category/deleteCategory";
import CategoryAddModal from "@/components/UI/CategoryAddModal";

const CategoryList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const { categories, categoryLoading } = useSelector(
    (state) => state.categories
  );
  const { currUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleDelete = (id) => {
    deleteCategory(currUser.brandName, id, dispatch);
  };
  return (
    <div>
      {categoryLoading ? (
        <Loader />
      ) : (
        <div className="p-2">
          <div className="flex justify-between w-full h-[50px] items-center">
            <p className="text-center py-4 font-semibold text-black text-xl">
              Categories
            </p>
            <button
              onClick={toggleModal}
              className="items-center p-2 flex gap-x-2 bg-black text-white rounded-lg font-semibold px-4 hover:bg-gray-700 transition-all duration-300"
            >
              <FaPlus />
              Add Category
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
                    Category
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Link
                  </th>
                  <th className="py-3 px-2 text-left text-gray-700 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="cursor-pointer">
                {categories?.length > 0 ?
                  categories.map((category, index) => (
                    <tr key={category._id} className="border-b border-gray-200">
                      <td className="py-4 px-2 text-gray-700">
                        {" "}
                        #{category?._id?.slice(0, 6)}....
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        <img
                          src={category?.image}
                          className="max-w-[50px] w-[50px] h-[50px]"
                          alt=""
                        />
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {category?.name}
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {category?.link}
                      </td>
                      <td className="py-4 px-2 text-red-600">
                        <div className="flex items-center gap-2">
                          <div onClick={() => handleDelete(category?._id)}>
                            <BsFillTrash3Fill />
                          </div>
                          <div
                            className="text-blue-800 text-2xl"
                            onClick={() => {
                              toggleModal(), setUpdatedCategory(category);
                            }}
                          >
                            <CiEdit />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )):<div className="text-start text-[20px] w-full py-[20px] pl-[10px]">No Categories Found</div>}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isOpen && (
        <CategoryAddModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          categoryLoading={categoryLoading}
          updatedData={updatedCategory}
          setUpdatedCategory={setUpdatedCategory}
        />
      )}
    </div>
  );
};

export default ProtectedRoute(CategoryList);
