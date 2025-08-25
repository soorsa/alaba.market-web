import { type OrderFilters } from "./../../pages/staff/OrdersScreen";
import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { OrderItem } from "../mutations/useCheckout";
import type { PaginatedResponse } from "../../types/PaginationTypes";

interface Customer {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  profile_pic: string;
  phone_number: string;
  active: boolean;
  is_vendor: boolean;
  company_name: string;
  address: string;
  date_joined: string;
}

export interface DeliveryAddress {
  id: number;
  first_name: string;
  last_name: string;
  session_id: string | null;
  city: string;
  address: string;
  delivery_note: string;
  phone_number: string;
  email: string;
  delivery_fee: number;
  customer: number;
  state: State;
  country: Country;
}

export interface State {
  id: number;
  name: string;
}
export interface Country {
  id: number;
  name: string;
}

export interface Order {
  order_id: string;
  products: OrderItem[];
  customer: Customer;
  session_id: string | null;
  total: string;
  paid: boolean;
  pay_on_delivery: boolean;
  delivery_status: string | null;
  confirmed: boolean;
  order_date: string;
  delivered: boolean;
  deliver_address: DeliveryAddress;
}

type OrdersResponse = PaginatedResponse<Order>;
export const getOrders = async (
  filter: OrderFilters,
  page: number
): Promise<OrdersResponse> => {
  const payload = new URLSearchParams();
  if (filter.delivery_status) {
    payload.append("delivery_status", filter.delivery_status);
  }
  payload.append("page", String(page));
  const response = await alabaApi.get(
    `/dashboard/orders/?${payload.toString()}`
  );
  return response.data;
};

// Query hook to get user Cart
export const useGetOrdersDashboard = (filter: OrderFilters, page: number) => {
  return useQuery<OrdersResponse>({
    queryKey: ["orders", filter, page],
    queryFn: () => getOrders(filter, page),
  });
};
