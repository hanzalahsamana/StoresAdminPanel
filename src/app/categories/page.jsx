"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "@/APIs/Category/deleteCategory";
import Button from "@/components/Actions/Button";
import DynamicTable from "@/components/Tables/Table";
import CategoryAddModal from "@/components/Modals/CategoryAddModal";

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

  const columns = [
    { key: "image", label: "Image", type: "image" },
    { key: "name", label: "Title" },
    { key: "link", label: "Link" },
  ];

  const actions = {
    edit: (row) => { toggleModal(); setUpdatedCategory(row) },
    delete: (row) => { deleteCategory(currUser.brandName, row?._id, dispatch) },
  };
  return (
    <div className="p-4">
      <div className="flex flex-col gap-3 justify-between w-full items-center bg-backgroundC p-4 rounded-md shadow-md">

        <div className="flex justify-between w-full items-center">
          <p className="text-center font-semibold text-textC text-[30px]">
            Categories
          </p>
          <Button
            label="Add Category"
            action={toggleModal}
            className="w-max !py-2"
          />
        </div>

        <DynamicTable columns={columns} data={categories} actions={actions} loading={categoryLoading} notFoundText="There are no categories to show" />


        {isOpen && (
          <CategoryAddModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            updatedData={updatedCategory}
          />
        )
        }
      </div >
    </div >
  );
};

export default ProtectedRoute(CategoryList);
