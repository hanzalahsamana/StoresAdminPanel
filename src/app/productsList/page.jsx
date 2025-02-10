"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/APIs/Product/deleteProductData";
import Add_Edit_Product from "@/components/productModal";
import DynamicTable from "@/components/Tables/DynamicTable";
import Button from "@/components/Actions/Button";


const ProductsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const { currUser } = useSelector((state) => state.currentUser);
  const { products, productLoading } = useSelector(
    (state) => state.productData
  );
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const columns = [
    { key: "images", label: "Image", type: "image" },
    { key: "name", label: "Title" },
    { key: "collectionName", label: "Collection", },
    { key: "brand", label: "Vendor", },
    { key: "stock", label: "Stock", type: "stock" },
  ];

  const actions = {
    edit: (row) => { toggleModal(); setUpdatedProduct(row) },
    delete: (row) => { deleteProduct(currUser.brandName, row?._id, dispatch) },
  };

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


      <DynamicTable columns={columns} data={products} actions={actions} loading={productLoading} notFoundText="There are no products to show" />

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
