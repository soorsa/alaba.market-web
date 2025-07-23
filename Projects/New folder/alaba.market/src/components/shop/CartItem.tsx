import React from "react";
import type { CartItem } from "../../types/CartTypes";
import { IoClose } from "react-icons/io5";
import { useRemoveFromCart } from "../../hooks/mutations/useRemoveFromCart";
import { useAddtoCart } from "../../hooks/mutations/useAddtoCart";
import { useUserStore } from "../../zustand/useUserStore";
import { useDeleteCartItem } from "../../hooks/mutations/useDeleteCartItem";
import SmallLoader from "../general/SmallLoader";
interface Props {
  cartItem: CartItem;
}
const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { user } = useUserStore();
  const { mutate: removeItem, isPending: removing } = useRemoveFromCart();
  const { mutate: addToCart, isPending: adding } = useAddtoCart();
  const { mutate: deleteItem, isPending: deleting } = useDeleteCartItem();
  const handleAdd = () => {
    addToCart({
      productID: cartItem.product.product_id,
      username: user?.username || "",
    });
  };
  const handleRemove = () => {
    removeItem({
      productID: cartItem.product.product_id,
      username: user?.username || "",
    });
  };
  const handleDelete = () => {
    deleteItem({
      productID: cartItem.product.product_id,
      username: user?.username || "",
    });
  };
  return (
    <div className="flex items-center flex-nowrap gap-2 py-2 relative">
      {deleting && (
        <div className="absolute inset-0 bg-red-200/10 flex items-center justify-center">
          <SmallLoader classname="!w-fit !h-fit !mx-0" color="red-500" />
          <span className="text-red-500">Deleting...</span>
        </div>
      )}
      <div className="relative h-[60px] w-[60px] rounded-lg overflow-hidden">
        <img
          src={`https://alaba.market/` + cartItem.product.image}
          alt={cartItem.product.title}
          className="w-full h-full"
        />
        <div className="bg-black/10 absolute inset-0"></div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="w-full line-clamp-1 text-sm text-left">
          {cartItem.product.title}
        </div>
        <div className="flex items-baseline text-gray-400">
          <button
            onClick={handleAdd}
            className="border border-gray-200 h-7 w-7 flex justify-center items-center text-center"
          >
            +
          </button>
          <div className="h-7 w-7">
            {adding || removing ? `...` : cartItem.quantity}
          </div>
          <button
            onClick={handleRemove}
            className="border border-gray-200 h-7 w-7 flex justify-center items-center text-center"
          >
            -
          </button>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="absolute top-4 right-3 text-gray-600 hover:text-gray-900 hover:bg-white flex items-center justify-center h-4 w-4 rounded-full hover:shadow-md cursor-pointer"
        aria-label="Close Modal"
      >
        <IoClose size={15} />
      </button>
    </div>
  );
};

export default CartItem;
