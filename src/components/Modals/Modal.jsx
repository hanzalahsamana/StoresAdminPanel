import { useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, setIsOpen, children, className , extraFuntion=() => { } }) => {
  const closeModal = useCallback(() => {
    extraFuntion()
    setIsOpen(false)
  }, [extraFuntion ,setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[150]"  >
      <div
        className={`relative bg-backgroundC rounded-lg  shadow-lg max-w-[750px] max-h-[600px] w-full overflow-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-[1]"
          onClick={closeModal}
        >
          <IoMdClose size={24} />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
