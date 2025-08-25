import React from "react";
import Button from "../general/Button";
import { useModalStore } from "../../zustand/ModalStore";
// import SmallLoader from "../general/SmallLoader";
import { IoInformationCircle } from "react-icons/io5";
import type { Order } from "../../hooks/querys/useGetOrders";
import { useDeleteOrder } from "../../hooks/mutations/useDeleteOrder";
interface Props {
  item: Order[];
  isMultiple?: boolean;
  setselectedOrder: (order: Order[]) => void;
}
const DeleteOrder: React.FC<Props> = ({
  item,
  isMultiple = false,
  setselectedOrder,
}) => {
  const { closeModal } = useModalStore();
  const { mutate: deleteOrders, isPending } = useDeleteOrder();
  const handleDelete = () => {
    setselectedOrder([]);
    const order_ids = item.map((order) => order.order_id);
    deleteOrders(order_ids, {
      onSuccess() {
        closeModal();
      },
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-10 w-full md:w-[225px]">
        <div className="mt-10">
          <p className="text-sm text-left">
            Are you sure you want to delete{" "}
            {isMultiple ? (
              <span className="">{item.length} </span>
            ) : (
              <span className="underline underline-offset-4 font-alaba-mid">
                {item[0].customer.first_name}'s{" "}
              </span>
            )}
            order(s) ?
          </p>
          <div className="flex gap-1 text-xs mt-3 text-gray-400">
            <IoInformationCircle size={20} />
            <span className="text-left flex-1">
              Note: Deleting order cannot be undone.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            label="Yes, Delete"
            className="bg-red-700 !text-gray-300"
            onClick={handleDelete}
            isLoading={isPending}
            disabled={isPending}
            loadingLabel="Deleting"
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

export default DeleteOrder;
