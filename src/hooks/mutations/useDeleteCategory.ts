import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Category } from "../../types/ProductsTypes";
import { useModalStore } from "../../zustand/ModalStore";

export const deleteCategory = async (slug: string): Promise<Category> => {
  const response = await alabaApi.delete(`/dashboard/category/${slug}/`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useDeleteCategory = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      showToast("Deleted category successfully!", "success");
      closeModal();
    },
    onError() {
      showToast("Unable to Delete...try again later", "error");
    },
  });
};
