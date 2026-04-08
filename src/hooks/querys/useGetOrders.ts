import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";

export const getOrders = async (
  filter: OrderFilterParams,
  page: number
): Promise<OrderHistoryResponse> => {
  const payload = new URLSearchParams();
  if (filter.delivery_status) {
    payload.append("delivery_status", filter.delivery_status);
  }
  payload.append("page", String(page));
  const response = await alabaApi.get(`/admin/orders/?${payload.toString()}`);
  return response.data;
};

// Query hook to get user Cart
export const useGetOrdersDashboard = (
  filter: OrderFilterParams,
  page: number
) => {
  return useQuery<OrderHistoryResponse>({
    queryKey: ["orders", filter, page],
    queryFn: () => getOrders(filter, page),
  });
};
