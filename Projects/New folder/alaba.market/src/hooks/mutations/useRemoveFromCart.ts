import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../api";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
