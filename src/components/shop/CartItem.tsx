import { Trash2 } from "lucide-react";
import React from "react";
import {
  useAddtoCart,
  useDeleteCartItem,
  useMinusFromCart,
} from "../../hooks/mutations/useCart";
import { formatPrice } from "../../utils/formatter";
import SmallLoader from "../general/SmallLoader";
interface Props {
  cartItem: CartItem;
}
const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { mutate: deleteItem, isPending: deleting } = useDeleteCartItem();
  const { mutate: addToCart, isPending: adding } = useAddtoCart();
  const { mutate: minus, isPending: minusing } = useMinusFromCart();
  const handleAdd = () => {
    addToCart({
      product_id: cartItem.product.id,
      quantity: 1,
    });
  };
  const handleMinus = () => {
    minus({ item_id: cartItem.id });
  };
  const handleDeleteItem = () => {
    deleteItem(cartItem.id);
  };
  return (
    <div className="grid grid-cols-7 gap-2 py-2 relative">
      {deleting && (
        <div className="absolute inset-0 bg-red-200/10 flex items-center justify-center rounded-lg">
          <SmallLoader classname="!w-fit !h-fit !mx-0" color="red-500" />
          <span className="text-red-500">Deleting...</span>
        </div>
      )}
      <div className="relative rounded-lg overflow-hidden h-12">
        <img
          src={cartItem.product.image}
          alt={cartItem.product.title}
          className="w-full h-full object-cover"
        />
        <div className="bg-black/10 absolute inset-0"></div>
      </div>
      <div className="flex-1 col-span-4">
        <div className="w-full line-clamp-1 text-sm text-left">
          {cartItem.product.title}
        </div>
        <div className="flex items-baseline text-gray-400">
          <button
            onClick={handleMinus}
            className="border border-gray-200 h-7 w-7 flex justify-center items-center text-center hover:bg-gray-100 hover:text-gray-500 rounded-md"
          >
            -
          </button>
          <div className="h-7 w-7">
            {adding || minusing ? `...` : cartItem.quantity}
          </div>
          <button
            onClick={handleAdd}
            className="border border-gray-200 h-7 w-7 flex justify-center items-center text-center hover:bg-gray-100 hover:text-gray-500 rounded-md"
          >
            +
          </button>
        </div>
      </div>
      <div className="col-span-2 text-right flex flex-col justify-between">
        <div className="flex justify-end text-red-500">
          <Trash2
            size={15}
            className="cursor-pointer"
            onClick={handleDeleteItem}
          />
        </div>
        <div className="">{formatPrice(cartItem.subtotal)}</div>
      </div>
    </div>
  );
};

export default CartItem;
