import { useEffect, useCallback } from "react";
import { VscClose } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 1, opacity: 0, y: -50 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 1, opacity: 0, y: -50 },
};

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  className,
  extraFuntion = () => {},
  position = "fixed",
  closeOnEsc = true,
}) => {
  const closeModal = useCallback(() => {
    try {
      extraFuntion();
    } catch (e) {
      console.error("Error in extraFuntion:", e);
    }
    setIsOpen(false);
  }, [extraFuntion, setIsOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.preventDefault();
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[150] p-6 ${position}`}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeModal}
        >
          <motion.div
            className={`relative bg-backgroundC rounded-lg shadow-lg max-w-[750px] max-h-[600px] w-full overflow-auto customScroll ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-900 z-[1]"
              onClick={closeModal}
            >
              <VscClose size={22} />
            </button>
            <div className="h-full">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
