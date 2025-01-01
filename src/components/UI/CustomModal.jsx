"use client";

import { useEffect } from "react";

const CustomModal = ({ isOpen, onClose, children , title = "About Us" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[80%] p-8 max-w-[900px] min-w-[300px] rounded-lg bg-white shadow-lg flex flex-col items-center gap-3">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <div>
          <p className="text-[24px]">{title}</p>
        </div>

        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
