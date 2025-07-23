import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/ProductsTypes";

type CartItem = {
  product: Product;
  quantity: number;
};

type Cart = {
  cart_id: string;
  customer: number;
  grandtotal: number;
  cartquantity: number;
  cartitems: CartItem[];
};

type ShoppingBag = {
  cart: Cart | null;
  resetCart: () => void;
};

export const useShoppingBagStore = create<ShoppingBag>()(
  persist(
    (set) => ({
      cart: null,

      resetCart: () => set({ cart: null }),
    }),
    { name: "shopping-bag" }
  )
);
