import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

export const setUserShippingAddress = async (payload: ShippingPayload) => {
  const res = await alabaApi.patch(`/shipping-address/`, payload);
  return res.data;
};

export const useSetShipping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setUserShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shipping"],
      });
      toast.success("Address updated");
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["shipping"],
      });
      toast.success("Failed to update");
    },
  });
};
