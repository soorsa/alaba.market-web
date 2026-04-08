import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";

// Base types
type Response = PaginatedResponse<OrderItem>;
export const getVendorOrders = async (page: number) => {
  const response = await alabaApi.get(`/vendor-order-items/?page=${page}`);
  return response.data;
};
// Query hook to get user Cart
export const useGetVendorOrders = (page: number) => {
  return useQuery<Response>({
    queryKey: ["vendor-orders", page],
    queryFn: () => getVendorOrders(page),
  });
};
