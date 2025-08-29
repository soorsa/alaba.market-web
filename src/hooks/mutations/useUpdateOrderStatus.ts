import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Order } from "../querys/useGetOrders";

export interface OrderPayload {
  order_id: string;
  formData: FormData;
}

export const updateOrderStatus = async (
  payload: OrderPayload
): Promise<Order> => {
  const response = await alabaApi.put(
    `/dashboard/orders/${payload.order_id}/update-status/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useUpdateOrderStatus = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      showToast("Updated Order successfully!", "success");
    },
    onError() {
      showToast("Unable to update...try again later", "error");
    },
  });
};
