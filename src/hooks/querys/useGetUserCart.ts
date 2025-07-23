import { useQuery } from "@tanstack/react-query";
import { fetchUserCart } from "../api";
import type { Cart } from "../../types/CartTypes";

// Query hook to get user Cart
export const useFetchUserCart = (username: string) => {
  return useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: () => fetchUserCart(username),
    enabled: !!username,
  });
};
