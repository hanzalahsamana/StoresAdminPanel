"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Actions/Button";
import DynamicTable from "@/components/Tables/Table";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import useConfirm from "@/Hooks/useConfirm";
import { deleteCollectionApi } from "@/APIs/Collection/deleteCollection";
import CollectionAddModal from "@/components/Modals/CollectionAddModal";
import ActionCard from "@/components/Cards/ActionCard";
import ImgToIcon from "@/components/Actions/ImgToIcon";
import { getCollections } from "@/APIs/Collection/getCollections";
import { useSwrFetch } from "@/Hooks/useSwrFetch";
import BASE_URL from "config";
import { setCollection } from "@/Redux/Collection/CollectionSlice";

const CollectionList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedCollection, setUpdatedCollection] = useState(null);
  const { collections } = useSelector((state) => state.collection);
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { confirm, ConfirmationModal } = useConfirm();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const columns = [
    { key: "image", label: "Image", type: "image" },
    { key: "name", label: "Title" },
    { key: "_id", label: "description" },
  ];

  const actions = {
    edit: (row) => { setUpdatedCollection(row); toggleModal(); },
    delete: (row) => { handleCollectionDelete(row?._id) },
  };

  const handleCollectionDelete = async (collectionId) => {
    const ok = await confirm("Delete Collection", "Are you sure you want to delete this collection?");
    if (!ok) return;
    await deleteCollectionApi(currUser.token, store?._id, collectionId);
  };

  const API_KEY = `${BASE_URL}/${store?._id}/getCollections`;
  const { data, isLoading, error } = useSwrFetch(API_KEY);

  useEffect(() => {
    dispatch(setCollection(data?.data));
  }, [data]);


  return (
    <BackgroundFrame>
      <ActionCard
        label={'Collections'}
        actionPosition="top"
        icon={<ImgToIcon url={'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/62/external-collections-modelling-agency-flaticons-lineal-color-flat-icons.png'} />}
        subText={'Manage your collections here. You can add, edit, or delete collections as needed.'}
        actions={
          <Button
            label="Add Collection"
            action={toggleModal}
            className="w-max !py-2"
            size="small"
          />
        }
      >
        <DynamicTable columns={columns} data={collections} actions={actions} loading={isLoading} notFoundText="There are no collections to show" />
        {ConfirmationModal}

        {isOpen && (
          <CollectionAddModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            updatedData={updatedCollection}
            setUpdatedData={setUpdatedCollection}
          />
        )}
      </ActionCard>
    </BackgroundFrame>
  );
};

export default CollectionList;
