import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";

// Base types
interface Vendor {
  id: number;
  name: string | null;
}

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
}

interface VendorItem {
  product_id: string;
  product_title: string;
  quantity: number;
  total: number;
}

export interface VendorOrder {
  order_id: string;
  customer_name: string;
  order_date: string;
  total_order_amount: number;
  vendor_order_total: number;
  delivery_status: string;
  paid: boolean;
  vendor_item_count: number;
  vendor_items: VendorItem[];
  delivery_address: DeliveryAddress;
}

// Main response type
interface VendorOrdersResponse {
  vendor: Vendor;
  orders: VendorOrder[];
  total_orders: number;
}

export const getVendorOrders = async (vendor_id: number | null) => {
  const response = await alabaApi.get(`/vendor/orders/${vendor_id}`);
  return response.data;
};
// Query hook to get user Cart
export const useGetVendorOrders = (vendor_id: number | null) => {
  return useQuery<VendorOrdersResponse>({
    queryKey: ["vendor-orders", vendor_id],
    queryFn: () => getVendorOrders(vendor_id),
    enabled: !!vendor_id,
  });
};
