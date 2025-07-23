import React from "react";
import type { CartItem } from "../../types/CartTypes";
import * as CartItemsx from "./CartItem";
interface Props {
  cartItems: CartItem[];
}
const CartItemList: React.FC<Props> = ({ cartItems }) => {
  if (cartItems.length < 1) {
    return <h1>No Items in Cart.</h1>;
  }
  return (
    <div className="divide divide-y-1 divide-gray-300">
      {cartItems.map((item, index) => (
        <CartItemsx.default cartItem={item} key={index} />
      ))}
    </div>
  );
};

export default CartItemList;
