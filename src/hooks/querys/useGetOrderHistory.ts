import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../zustand/useUserStore";
import alabaApi from "../ApiClient";

export const getOrderHistory = async (): Promise<OrderHistoryResponse> => {
  const response = await alabaApi.get(`/orders/`);
  return response.data;
};
const getOrderByID = async (id: string): Promise<Order> => {
  const res = await alabaApi.get(`/orders/${id}`);
  return res.data;
};

// Query hook to get user Cart
export const useGetOrderHistory = () => {
  const { token } = useUserStore.getState();
  return useQuery<OrderHistoryResponse>({
    queryKey: ["orders"],
    queryFn: () => getOrderHistory(),
    enabled: !!token,
  });
};
export const useGetOrderByID = (id: string) => {
  return useQuery<Order>({
    queryKey: ["orders", id],
    queryFn: () => getOrderByID(id),
    enabled: !!id,
  });
};
