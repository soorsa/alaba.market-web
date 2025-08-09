import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
interface Stats {
  total_orders: number;
  total_customers: number;
  total_products: number;
  total_approved_products: number;
  total_disapproved_products: number;
  delivered_orders: number;
  pending_orders: number;
  total_revenue: string | number;
}
export const getStats = async (): Promise<Stats> => {
  const response = await alabaApi.get(`/dashboard/stats`);
  return response.data;
};

// Query hook to get user Cart
export const useGetStats = () => {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: getStats,
  });
};
