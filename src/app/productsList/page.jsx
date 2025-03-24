"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/APIs/Product/deleteProductData";
import Button from "@/components/Actions/Button";
import DynamicTable from "@/components/Tables/Table";
import AddEditProductModal from "@/components/Modals/AddEditProductModal";


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
    edit: (row) => { setUpdatedProduct(row); toggleModal(); },
    delete: (row) => { deleteProduct(currUser.brandName, row?._id, dispatch) },
  };

  return (
    <div className="p-5">
      <div className="flex flex-col gap-3 justify-between w-full items-center bg-backgroundC p-4 rounded-md shadow-md">
        <div className="flex justify-between w-full items-center">
          <p className="text-center font-semibold text-textC text-[30px]">
            Products
          </p>
          <Button
            label="Add Product"
            action={() => { setUpdatedProduct(null); toggleModal(); }}
            className="w-max !py-2"
          />
        </div>


        <DynamicTable columns={columns} data={products} actions={actions} loading={productLoading} notFoundText="There are no products to show" />

        <AddEditProductModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          productLoading={productLoading}
          updatedData={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
        />

      </div>
    </div>
  );
};

export default ProtectedRoute(ProductsList);
