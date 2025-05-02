import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../Actions/Button";
import Modal from "./Modal";
import ActionCard from "../Cards/ActionCard";
import MultiSelectDropdown from "../Actions/MultiSelectDropdown";
import DropDown from "../Actions/DropDown";
import { variationSuggestions } from "@/Structure/DefaultStructures";
import { addVariation, deleteVariation, editVariation } from "@/APIs/StoreDetails/variation";
import { toast } from "react-toastify";


const initialState = { name: '', options: [] }

const AddGlobalVariationModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { variations } = useSelector((state) => state?.storeDetail?.storeDetail);
  const { currUser } = useSelector((state) => state.currentUser);

  const [variationFormData, setVariationFormData] = useState(initialState);
  const [isVariationCreating, setIsVariationCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // loading state

  const defaultVariationOptions = useMemo(() => {
    return variationSuggestions
      .filter((v) => v?.name === variationFormData.name)
      .flatMap((v) => v?.options || []);
  }, [variationFormData.name]);


  const handleChange = (key, value) => {
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setVariationFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "name") {
      setVariationFormData((prev) => ({ ...prev, options: [] }));
    }
  };

  const handleSave = async () => {
    let newErrors = {};

    if (!variationFormData.name?.trim()) {
      newErrors.name = "Variation name is required.";
    }

    if (!variationFormData.options || variationFormData.options.length === 0) {
      newErrors.options = "Please add at least one Option.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingIndex !== null) {
      await handleEditVariation();
    } else {
      await handleCreateVariation();
    }
  };

  const handleCreateVariation = async () => {
    try {
      setIsLoading(true);
      await addVariation(variationFormData, currUser.token, dispatch);
      console.log("Variation created successfully.");
      resetForm();
    } catch (error) {
      console.error("Error creating variation:", error);
      toast.error(error.response ? error.response.data.message : error.message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditVariation = async () => {
    try {
      setIsLoading(true);
      const variationId = variations[editingIndex]?._id;
      await editVariation(variationId, variationFormData, currUser.token, dispatch);
      console.log("Variation edited successfully.");
      resetForm();
    } catch (error) {
      console.error("Error creating variation:", error);
      toast.error(error.response ? error.response.data.message : error.message || "Something went wrong")
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVariation = async (index) => {
    try {
      setIsLoading(true);
      const variationId = variations[index]?._id;
      await deleteVariation(variationId, currUser.token, dispatch);
      console.log("Variation deleted successfully.");
    } catch (error) {
      console.error("Error deleting variation:", error);
      toast.error(error.response ? error.response.data.message : error.message)
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setVariationFormData(initialState);
    setIsVariationCreating(false);
    setEditingIndex(null);
    setErrors({});
  };

  const handleEditClick = (index) => {
    const selectedVariation = variations[index];
    setVariationFormData({ ...selectedVariation });
    setEditingIndex(index);
    setIsVariationCreating(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={(val) => {
        setIsOpen(val);
        if (!val) resetForm();
      }}
    >
      <ActionCard
        lable={!isVariationCreating ? 'Variations' : editingIndex !== null ? 'Edit Variation' : 'Add Variation'}
        actionPosition="top"
        className="!pt-8"
        actions={!isVariationCreating ? (
          <Button variant="black" size="small" label="Add New Variation" action={() => setIsVariationCreating(true)} />
        ) : (
          <>
            <Button variant="black" size="small" label="Cancel" action={resetForm} />
            <Button
              variant="black"
              size="small"
              label={"Save"}
              action={handleSave}
              loading={isLoading}
            />
          </>
        )}
      >
        <div className="w-full h-[300px] overflow-x-hidden px-[10px] customScroll">
          {!isVariationCreating ? (
            <div className="flex flex-col justify-center items-center w-full gap-4">
              {variations?.length === 0 ? (
                <p className="text-sm py-[20px] text-gray-500">
                  No variations found.{" "}
                  <button onClick={() => setIsVariationCreating(true)} className="text-blue-500 underline">
                    Add now
                  </button>
                </p>
              ) : (
                variations?.map((variation, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full justify-between border p-3 rounded shadow-sm"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{variation.name || "Unnamed Variation"}</span>
                      <span className="text-sm text-gray-500 break-all">
                        {variation.options.join(", ") || "No options available"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[18px]">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <MdOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteVariation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="w-full rounded relative bg-backgroundC space-y-6">
              <p className="text-yellow-500">You can add custom names by typing them.</p>
              <div className="flex flex-col gap-2">
                <p>Variation Name:</p>
                <DropDown
                  setSelectedOption={(value) => handleChange("name", value)}
                  selectedOption={variationFormData.name}
                  wantsCustomOption={true}
                  defaultOptions={variationSuggestions.map((v) => v?.name) || []}
                  placeholder="Eg: Color, Size"
                  error={errors.name}
                  layout={null}
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="flex justify-between">
                  <p>Variation Options:</p>
                  <button
                    onClick={() => handleChange("options", [])}
                    className="text-red-500 text-sm block"
                  >
                    <IoMdClose />
                  </button>
                </span>
                <MultiSelectDropdown
                  error={errors.options}
                  wantsCustomOption={true}
                  selectedOptions={variationFormData?.options}
                  setSelectedOptions={(value) => handleChange("options", value)}
                  defaultOptions={defaultVariationOptions}
                  placeholder="Eg: S, M, L"
                />
              </div>
            </div>
          )}
        </div>
      </ActionCard>
    </Modal>
  );
};

export default AddGlobalVariationModal;
