import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";
import type { Order } from "./useGetOrders";
interface DashboardResponse {
  total_orders: number;
  total_customers: number;
  total_products: number;
  total_approved_products: number;
  total_disapproved_products: number;
  delivered_orders: number;
  pending_orders: number;
  total_revenue: string | number;
  orders: Order[];
  products: Product[];
}
export const getDashboardData = async (): Promise<DashboardResponse> => {
  const response = await alabaApi.get(`/dashboard`);
  return response.data;
};

// Query hook to get user Cart
export const useGetDashboardData = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
};
