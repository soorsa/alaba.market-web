import React from "react";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import SmallLoader from "../general/SmallLoader";
import { useDeleteAllProducts } from "../../hooks/mutations/useDeleteAllProducts";
const DeleteAllProducts: React.FC = () => {
  const { closeModal } = useModalStore();
  const { mutate: deleteAll, isPending } = useDeleteAllProducts();
  if (isPending) {
    return <SmallLoader />;
  }
  return (
    <div>
      <div className="flex flex-col gap-10 w-full md:w-[225px]">
        <div className="mt-10">
          <p className="text-sm text-left">
            Are you sure you want to delete all Products
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            label="Yes, Delete"
            className="bg-red-700 !text-gray-300"
            onClick={() => deleteAll()}
          />
          <Button
            label="No, Cancel"
            onClick={closeModal}
            className="bg-transparent border-1 border-gray-700 !text-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteAllProducts;
