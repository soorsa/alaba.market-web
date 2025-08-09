// components/Modal.tsx
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useModalStore } from "../../zustand/ModalStore";

const Modal = () => {
  const { isOpen, content, title, theme, closeModal } = useModalStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={closeModal}
    >
      <div
        className={`${
          theme === "light" ? `bg-white` : `bg-alaba-dark-500 text-gray-300`
        } p-10 rounded-[25px] shadow-lg w-[90%] md:w-fit max-w-[550px] relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 left-10 text-lg font-alaba-mid">
          {title}
        </div>
        <button
          className="absolute top-4 right-3 text-gray-400 hover:text-gray-200 cursor-pointer"
          onClick={closeModal}
          aria-label="Close Modal"
        >
          <IoClose size={24} />
        </button>
        <div className="max-h-[550px] overflow-hidden">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
