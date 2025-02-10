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
import DynamicTable from "@/components/Tables/DynamicTable";
import Button from "@/components/Actions/Button";

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
    <div className="p-2">
      <div className="flex justify-between py-4 w-full items-center">
        <p className="text-center font-semibold text-black text-[30px]">
          Categories
        </p>
        <Button
          label="Add New Category"
          action={toggleModal}
          className="w-max !py-2"
        />
      </div>

      <DynamicTable columns={columns} data={categories} actions={actions} loading={categoryLoading} notFoundText="There are no categories to show" />


      {isOpen && (
        <CategoryAddModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          categoryLoading={categoryLoading}
          updatedData={updatedCategory}
          setUpdatedCategory={setUpdatedCategory}
        />
      )
      }
    </div >
  );
};

export default ProtectedRoute(CategoryList);
