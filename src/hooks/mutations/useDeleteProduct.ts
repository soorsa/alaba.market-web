import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useModalStore } from "../../zustand/ModalStore";
import alabaApi from "../ApiClient";

export const deleteProduct = async (product_id: string): Promise<Product> => {
  const response = await alabaApi.delete(`/products/${product_id}/`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useDeleteProduct = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      toast.success("Deleted product successfully!");
      closeModal();
    },
    onError() {
      toast.error("Unable to Delete...try again later");
    },
  });
};
