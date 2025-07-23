import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../api";
import { useToastStore } from "../../zustand/ToastStore";

export const useDeleteCartItem = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      showToast("Item removed from cart successfully", "success");
    },
    onError: () => {
      showToast("Failed to delete item from cart", "error");
    },
  });
};
