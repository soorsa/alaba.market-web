import { useQuery } from "@tanstack/react-query";
import type { Order } from "../mutations/useCheckout";
import alabaApi from "../ApiClient";
import { useUserStore } from "../../zustand/useUserStore";

export const getOrderHistory = async (username: string): Promise<Order[]> => {
  const response = await alabaApi.get(`/${username}/orderhistory`);
  return response.data;
};

// Query hook to get user Cart
export const useGetOrderHistory = () => {
  const { user } = useUserStore.getState();
  const username = user?.username || "";
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => getOrderHistory(username),
    enabled: !!username,
  });
};
