import { useMutation, useQueryClient } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import { useModalStore } from "../../zustand/ModalStore";
import toast from "react-hot-toast";

export const deleteCategory = async (id: number): Promise<Category> => {
  const response = await alabaApi.delete(`/categories/${id}/`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useDeleteCategory = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Deleted category successfully!");
      closeModal();
    },
    onError() {
      toast.error("Unable to Delete...try again later");
    },
  });
};
