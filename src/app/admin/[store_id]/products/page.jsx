"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/APIs/Product/deleteProductData.jsx";
import Button from "@/components/Actions/Button";
import DynamicTable from "@/components/Tables/Table";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import ActionCard from "@/components/Cards/ActionCard";
import AddGlobalVariationModal from "@/components/Modals/AddGlobalVariationModal";
import { useRouter } from "next/navigation";


const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const { currUser } = useSelector((state) => state.currentUser);
  const router = useRouter();
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
    edit: (row) => { router.push(`/products/edit/${row?._id}`); },
    delete: (row) => { deleteProduct(currUser.brandName, row?._id, dispatch) },
  };

  return (
    <BackgroundFrame>
      <ActionCard
        label={'Products'}
        actionPosition="top"
        actions={<>
          <Button
            label="Add Product"
            size="small"
            action={() => { router.push(`/products/add`); }}
            className="w-max !py-2"
          />
          <Button
            label="Variations"
            variant="outline"
            size="small"
            action={() => { setUpdatedProduct(null); toggleModal(); }}
            className="w-max !py-2"
          />
        </>}
      >


        <DynamicTable columns={columns} data={products} actions={actions} loading={productLoading} notFoundText="There are no products to show" />
        <AddGlobalVariationModal setIsOpen={setIsOpen} isOpen={isOpen} />

      </ActionCard>
    </BackgroundFrame>

  );
};

export default ProtectedRoute(Products);
