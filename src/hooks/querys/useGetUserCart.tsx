import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../zustand/useUserStore";
import { fetchUserCart } from "../api";

// Query hook to get user Cart
export const useFetchUserCart = () => {
  const { token } = useUserStore();
  return useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: () => fetchUserCart(),
    enabled: !!token,
  });
};
