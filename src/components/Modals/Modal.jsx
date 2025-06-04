import { useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { VscClose } from "react-icons/vsc";

const Modal = ({ isOpen, setIsOpen, children, className, extraFuntion = () => { }, position = "fixed" }) => {
  const closeModal = useCallback(() => {
    extraFuntion()
    setIsOpen(false)
  }, [extraFuntion, setIsOpen]);

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
    <div className={`inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[150] p-6 ${position}`}  >
      <div
        className={`relative bg-backgroundC rounded-lg  shadow-lg max-w-[750px] max-h-[600px] w-full overflow-auto customScroll  ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-900 z-[1]"
          onClick={closeModal}
        >
          <VscClose size={22} />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
