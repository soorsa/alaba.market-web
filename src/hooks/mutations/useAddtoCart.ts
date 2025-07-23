import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../api";
import { useToastStore } from "../../zustand/ToastStore";

export const useAddtoCart = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      showToast("Added to Cart", "success");
    },
  });
};
