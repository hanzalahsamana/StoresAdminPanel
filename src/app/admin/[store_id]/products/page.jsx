"use client";
import { useSelector } from "react-redux";
import { deleteProduct } from "@/APIs/Product/deleteProduct.js";
import { useRouter } from "next/navigation";
import Button from "@/components/Actions/Button";
import DynamicTable from "@/components/Tables/Table";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import ActionCard from "@/components/Cards/ActionCard";
import useConfirm from "@/Hooks/useConfirm";
import ImgToIcon from "@/components/Actions/ImgToIcon";

const Products = () => {
  const router = useRouter();
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { products, productLoading } = useSelector((state) => state.productData);

  const { confirm, ConfirmationModal } = useConfirm();

  const columns = [
    { key: "displayImage", label: "Image", type: "image" },
    { key: "name", label: "Title" },
    { key: "price", label: "price" },
    { key: "vendor", label: "Vendor", },
    { key: "stock", label: "Stock", type: "stock" },
  ];

  const actions = {
    edit: (row) => { router.push(`/products/edit/${row?._id}`); },
    delete: (row) => { handleProductDelete(row?._id) },
  };

  const handleProductDelete = async (productId) => {
    const ok = await confirm("Delete Product", "Are you sure you want to delete this product?");
    if (!ok) return;
    await deleteProduct(currUser.token, store?._id, productId);
  };

  return (
    <BackgroundFrame>
      <ActionCard
        label={'Products'}
        actionPosition="top"
        icon={<ImgToIcon url={'https://img.icons8.com/doodle/48/t-shirt--v1.png'} />}
        subText={'Manage your products here. You can add, edit, or delete products as needed.'}
        actions={<>
          <Button
            label="Add Product"
            size="small"
            action={() => { router.push('add'); }}
            className="w-max !py-2"
          />
        </>}
      >

        <DynamicTable columns={columns} data={products} actions={actions} loading={productLoading} notFoundText="There are no products to show" />
        {ConfirmationModal}
        {/* <AddGlobalVariationModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
      </ActionCard>
    </BackgroundFrame>

  );
};

export default Products;
