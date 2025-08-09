import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";

export interface CheckoutPayload {
  phoneNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  address: string;
  note?: string;
  paymentMethod: string;
}

export interface OrderItem {
  id: number;
  products: Product;
  quantity: number;
  total: number;
}
interface Customer {
  username: string;
  email: string;
  last_name: string;
  first_name: string;
  phone_number: string;
  profile_pic: string;
  is_staff: boolean;
}

export interface Order {
  order_id: string;
  products: OrderItem[];
  deliver_address: string;
  session_id: null;
  total: string;
  paid: boolean;
  pay_on_delivery: boolean;
  delivery_status: null;
  confirmed: boolean;
  order_date: string;
  delivered: boolean;
  customer: Customer;
}
export const checkout = async (payload: CheckoutPayload): Promise<Order> => {
  const formData = new FormData();
  if (payload.username) {
    formData.append("username", payload.username);
  }
  if (payload.email) {
    formData.append("email", payload.email);
  }
  if (payload.firstName) {
    formData.append("firstName", payload.firstName);
  }
  if (payload.lastName) {
    formData.append("lastName", payload.lastName);
  }
  if (payload.phoneNumber) {
    formData.append("phoneNumber", payload.phoneNumber);
  }
  if (payload.country) {
    formData.append("country", payload.country);
  }
  if (payload.state) {
    formData.append("state", payload.state);
  }
  if (payload.city) {
    formData.append("city", payload.city);
  }
  if (payload.address) {
    formData.append("address", payload.address);
  }
  if (payload.note) {
    formData.append("delivery_note", payload.note);
  }
  if (payload.paymentMethod) {
    formData.append("paymentMethod", payload.paymentMethod);
  }
  console.log("formData", formData);
  const response = await alabaApi.post("/orders/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};

export const useCheckout = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      showToast("Order Placed successfully!", "success");
    },
    onError() {
      showToast("Unable to place order...try again later", "error");
    },
  });
};
