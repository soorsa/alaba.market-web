import React from "react";
import type { Product } from "../../types/ProductsTypes";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
import { useDeleteProduct } from "../../hooks/mutations/useDeleteProduct";
import SmallLoader from "../general/SmallLoader";
interface Props {
  item: Product;
}
const DeleteItem: React.FC<Props> = ({ item }) => {
  const { closeModal, theme } = useModalStore();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  if (isPending) {
    return <SmallLoader />;
  }
  return (
    <div>
      <div className="flex flex-col gap-10 w-full md:w-[225px]">
        <div className="mt-10">
          <p className="text-sm text-left">
            Are you sure you want to delete{" "}
            <span className="underline underline-offset-4 font-alaba-mid">
              "{item.title}"
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            label="Yes, Delete"
            className="bg-red-700 !text-gray-300"
            onClick={() => deleteProduct(item.product_id)}
          />
          <Button
            label="No, Cancel"
            onClick={closeModal}
            className={`${
              theme === "light"
                ? "!text-gray-700 border-gray-300"
                : "!text-gay-300 border-gray-700"
            } bg-transparent border-1`}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
