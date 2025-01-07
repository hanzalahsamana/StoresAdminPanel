"use client";

import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import ImageUploader from "./ImageUploader";
import FaqUploader from "./FaqUploader";
import InputField from "./InputField";

const CustomModal = ({ isOpen, onClose, children, selectedPage , setSelectedPage }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPage(null)
      }
    };
    if (selectedPage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedPage, selectedPage]);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    text: '',
    buttonText: '',
    image: '',
    faqs: [{ Q: '', A: '' }],
    video: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const filteredSelectedPage = { ...selectedPage };
  
    delete filteredSelectedPage._id;
    delete filteredSelectedPage.__v;
    delete filteredSelectedPage.updatedAt;
  
    setFormData(prevState => ({
      ...prevState,
      ...filteredSelectedPage,
    }));
  }, [selectedPage]);

  const componentMapping = {
    'About Us': (
      <>
        <InputField value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <TextEditor editorContent={formData.text} setEditorContent={(value) => setFormData({ ...formData, text: value })} />
        <ImageUploader image={formData.image} setImage={(image) => setFormData({ ...formData, image })} />
      </>
    ),
    'FAQs': (
      <>
        <InputField value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <FaqUploader faqs={formData.faqs} onChange={(faqs) => setFormData({ ...formData, faqs })} />
      </>
    ),
    'Contact Details': (
      <>
        <InputField value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <InputField value={formData.email} placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <InputField value={formData.address} placeholder="address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        <InputField value={formData.phone} placeholder="phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      </>
    ),
    'Terms And Condition': (
      <>
        <InputField value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <TextEditor editorContent={formData.text} setEditorContent={(value) => setFormData({ ...formData, text: value })} />
      </>
    ),
    'Category About': (
      <>
        <InputField value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <TextEditor editorContent={formData.text} setEditorContent={(value) => setFormData({ ...formData, text: value })} />
        <ImageUploader image={formData.image} setImage={(image) => setFormData({ ...formData, image })} />
      </>
    ),
    'Terms And Condition': (
      <>
        <InputField value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <TextEditor editorContent={formData.text} setEditorContent={(value) => setFormData({ ...formData, text: value })} />
      </>
    ),
    'Privacy Policy': (
      <>
        <InputField value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <TextEditor editorContent={formData.text} setEditorContent={(value) => setFormData({ ...formData, text: value })} />
      </>
    ),
  };

  if (!selectedPage) return null;

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[80%] p-8 max-w-[900px] min-w-[300px] rounded-lg bg-white shadow-lg flex flex-col items-center gap-3">
        <button
          onClick={()=>setSelectedPage(null)}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <div>
          {componentMapping[formData?.type]}
          {/* <p className="text-[24px]">{title}</p> */}
        </div>

        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
