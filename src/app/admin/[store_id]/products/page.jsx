"use client";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/APIs/Product/deleteProduct.js";
import { useRouter } from "next/navigation";
import Button from "@/components/Actions/Button";
import DynamicTable from "@/components/Tables/Table";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import ActionCard from "@/components/Cards/ActionCard";
import useConfirm from "@/Hooks/useConfirm";
import ImgToIcon from "@/components/Actions/ImgToIcon";
import { useEffect } from "react";
import { getProducts } from "@/APIs/Product/getProducts";
import { setProductData } from "@/Redux/Product/ProductSlice";
import { useSwrFetch } from "@/Hooks/useSwrFetch";
import BASE_URL from "config";
import PillSelector from "@/components/Actions/PillSelector";
import { mutate } from "swr";

const Products = () => {
  const router = useRouter();
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { products, productLoading } = useSelector((state) => state.productData);

  const { confirm, ConfirmationModal } = useConfirm();
  const dispatch = useDispatch();

  const columns = [
    { key: "displayImage", label: "Image", type: "image" },
    { key: "name", label: "Title" },
    { key: "price", label: "price" },
    { key: "vendor", label: "Vendor", },
    { key: "stock", label: "Stock", type: "stock" },
  ];

  const actions = {
    edit: (row) => { router.push(`./products/edit/${row?._id}`); },
    delete: (row) => { handleProductDelete(row?._id) },
  };

  const handleProductDelete = async (productId) => {
    const ok = await confirm("Delete Product", "Are you sure you want to delete this product?");
    if (!ok) return;

    await deleteProduct(currUser.token, store?._id, productId);
  };

  const API_KEY = `${BASE_URL}/${store?._id}/getProducts?sortBy=newest`;
  const { data, isLoading, error } = useSwrFetch(API_KEY);

  useEffect(() => {
    dispatch(setProductData(data?.data))
  }, [data]);

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
            action={() => { router.push('./products/add'); }}
            className="w-max !py-2"
          />
        </>}
      >
        {/* <div className="flex justify-end items-center">
          <PillSelector
            data={[
              { label: 'Newest', value: 'newest', },
              { label: 'In Stock', value: 'inStock', },
              { label: 'Top Rated', value: 'topRated', },
            ]}
            label="Sort By :"
            selectedValue="newest"
            className='w-max'
          />
        </div> */}

        <DynamicTable columns={columns} data={products} actions={actions} loading={isLoading} notFoundText="There are no products to show" />
        {ConfirmationModal}
        {/* <AddGlobalVariationModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
      </ActionCard>
    </BackgroundFrame>

  );
};

export default Products;
