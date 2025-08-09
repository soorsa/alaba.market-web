import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";
import { useModalStore } from "../../zustand/ModalStore";

export const deleteProduct = async (product_id: string): Promise<Product> => {
  const response = await alabaApi.delete(`/dashboard/product/${product_id}/`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useDeleteProduct = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      showToast("Deleted product successfully!", "success");
      closeModal();
    },
    onError() {
      showToast("Unable to Delete...try again later", "error");
    },
  });
};
