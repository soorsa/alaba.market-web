import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addToCart, clearCart, deleteCartItem, minusFromCart } from "../api";

export const useAddtoCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Added to Cart");
    },
    onError: () => {
      toast.error("Failed to update cart");
    },
  });
};
export const useMinusFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: minusFromCart,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Cart item updated");
    },
    onError: () => {
      toast.error("Failed to update cart");
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Removed from cart");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Cart cleared");
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Failed to clear cart");
    },
  });
};
