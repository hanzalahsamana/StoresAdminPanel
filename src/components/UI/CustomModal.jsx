"use client";

import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import FaqUploader from "./FaqUploader";
import InputField from "./InputField";
import "./style.css";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { validateForm } from "@/Utils/pageDataValidate";
import { uploadToCloudinary } from "@/Utils/uploadToCloudinary";
import { editPagesData } from "@/APIs/PagesData/editPagesData";
import { useDispatch, useSelector } from "react-redux";

const TextEditor = dynamic(() => import("./TextEditor"), { ssr: false });

const CustomModal = ({ selectedPage, setSelectedPage }) => {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);
  const { pagesData } = useSelector((state) => state.pagesData);

  const componentMapping = {
    "About Us": ["title", "text", "image"],
    "Hero Banner": ["image"],
    "FAQ": ["title", "faqs"],
    "Contact": ["title", "email", "phone", "address"],
    "Terms and Conditions": ["title", "text"],
    "Our Quality": ["title","buttonText", "text", "image" ],
    "Manufacture Process": ["title", "text", "image"],
    "Privacy Policy": ["title", "text"],
    "Return Policy": ["title", "text"],
    "Shipping Policy": ["title", "text"],
    "Site Logo": ["image"],
    "Fabric Remants": ["title","buttonText", "text", "image"],
  };

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    text: "",
    image: "",
    faqs: [{ Q: "", A: "" }],
    email: "",
    phone: "",
    address: "",
  });

  const pageName = selectedPage?.type;

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const validationErrors = validateForm(componentMapping, formData);
      if (validationErrors.length > 0) {
        toast.error(validationErrors[0]);
        return;
      }

      let updatedData = { ...formData };

      if (formData.image instanceof File) {
        const uploadedImageUrl = await uploadToCloudinary(formData.image);
        updatedData.image = uploadedImageUrl;
      }

      await editPagesData(updatedData, currUser?.brandName, selectedPage._id, dispatch);
      toast.success("Form submitted successfully!");
      setSelectedPage({ ...updatedData, _id: selectedPage._id });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const renderComponents = () => {
    const fields = componentMapping[formData.type] || [];
    return fields.map((field) => {
      if (["title", "email", "phone", "address" , "buttonText"].includes(field)) {
        return (
          <InputField
            key={field}
            value={formData[field]}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        );
      }
      if (field === "text") {
        return (
          <TextEditor
            editorContent={formData[field]}
            setEditorContent={(value) => handleInputChange(field, value)}
          />
        );
      }
      if (field === "faqs") {
        return (
          <FaqUploader
            key={field}
            initialFaqs={formData[field]}
            setFaqs={(faqs) => handleInputChange(field, faqs)}
          />
        );
      }
      if (field === "image") {
        return (
          <ImageUploader
            key={field}
            image={formData[field]}
            setImage={(image) => handleInputChange(field, image)}
          />
        );
      }
      return null;
    });
  };

  const getGridClass = () => {
    const fields = componentMapping[formData.type] || [];
    const count = fields.length;

    if (count === 1) return "single";
    if (count === 2) return "double";
    if (count === 3) return "triple";
    if (count >= 4) return "quad";
    return "";
  };

  useEffect(() => {
    if (selectedPage) {
      const updatedPage = pagesData.find((page) => page._id === selectedPage._id);
      if (updatedPage) {
        const { _id, __v, updatedAt, ...rest } = updatedPage;
        setFormData(rest);
      }
    }
  }, [selectedPage, pagesData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPage(null);
      }
    };
    if (selectedPage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedPage, selectedPage]);

  if (!selectedPage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[80%] p-8 max-w-[900px] min-w-[300px] rounded-lg bg-white shadow-lg flex flex-col items-center gap-3">
        <div>
          <h1>{pageName}</h1>
        </div>
        <button
          onClick={() => setSelectedPage(null)}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <div
          className={`border-t border-b border-[#c9c9c98f] customScroll py-[12px] px-[5px] modal-grid ${getGridClass()}`}
        >
          {renderComponents()}
        </div>
        <div className="flex justify-end w-full">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#000000] text-white rounded-sm shadow-lg transform transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl focus:outline-none"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
