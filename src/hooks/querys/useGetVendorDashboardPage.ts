import { useUserStore } from "./../../zustand/useUserStore";
import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";
export interface OrderItem {
  id: number;
  products: Product;
  quantity: number;
  total: number;
  vendor_total: number;
}
interface DashboardResponse {
  total_orders: number;
  total_products: number;
  total_approved_products: number;
  total_disapproved_products: number;
  total_revenue: string | number;
  orders: OrderItem[];
}
export const getVendorDashboardData = async (): Promise<DashboardResponse> => {
  const state = useUserStore.getState();
  const response = await alabaApi.get(`/vendor-page2/${state.user?.username}`);
  return response.data;
};

// Query hook to get user Cart
export const useGetVendorDashboardData = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["vendor-dashboard"],
    queryFn: getVendorDashboardData,
  });
};
