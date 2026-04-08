import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "../../zustand/ModalStore";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";

export const deleteAllProducts = async (): Promise<Product> => {
  const response = await alabaApi.delete(`/dashboard/product/delete-all/`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useDeleteAllProducts = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllProducts,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      showToast("Deleted all products successfully!", "success");
      closeModal();
    },
    onError() {
      showToast("Unable to Delete...try again later", "error");
    },
  });
};
