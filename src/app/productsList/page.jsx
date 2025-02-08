"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/loader";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/APIs/Product/deleteProductData";
import { fetchProducts } from "@/APIs/Product/getProductData";
import Add_Edit_Product from "@/components/productModal";
import DynamicTable from "@/components/Tables/dynamicTable";
import Button from "@/components/Actions/Button";




const ProductsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(null);
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

  const columns = [
    { key: "images", label: "Image", type: "image" },
    { key: "name", label: "Title" },
    { key: "collectionName", label: "Collection", },
    { key: "brand", label: "Vendor", },
    { key: "alt ", label: "Stock", type: "boolean" },
  ];
  const data = [
    // { name: "John Doe", email: "https://example.com", role: "Admin", profile: "https://via.placeholder.com/40" },
    // { name: "Jane Doe", email: "https://example.com", role: "User", profile: "https://via.placeholder.com/40" }
  ];

  const actions = {
    edit: (row) => { toggleModal(); setUpdatedProduct(row) },
    delete: (row) => { handleDelete(row?._id) },
  };

  if(productLoading){
    return <Loader/>
  }
  return (
    <div className="p-2">
      <div className="flex justify-between py-4 w-full items-center">
        <p className="text-center font-semibold text-black text-[30px]">
          Products
        </p>
        <Button
          label="Add New Product"
          action={toggleModal}
          className="w-max !py-2"
        />
      </div>


      <DynamicTable columns={columns} data={products} actions={actions} loading={productLoading} />

      <Add_Edit_Product
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productLoading={productLoading}
        updatedData={updatedProduct}
        setUpdatedProduct={setUpdatedProduct}
      />

    </div>
  );
};

export default ProtectedRoute(ProductsList);
