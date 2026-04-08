import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

export const updateOrderStatus = async (
  payload: OrderUpdatePayload
): Promise<Order> => {
  const response = await alabaApi.put(
    `/admin/orders/${payload.order_id}/`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      toast.success("Updated Order successfully!");
    },
    onError() {
      toast.error("Unable to update...try again later");
    },
  });
};
