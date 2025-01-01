"use client";

import { useEffect } from "react";

const CustomModal = ({ isOpen, onClose, children }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[80%] max-w-[900px] min-w-[300px] rounded-lg bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <div className="p-8 flex gap-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
