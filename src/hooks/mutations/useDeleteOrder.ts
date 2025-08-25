import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import { useModalStore } from "../../zustand/ModalStore";

export const deleteOrder = async (order_ids: string[]): Promise<void> => {
  const response = await alabaApi.delete(`/dashboard/orders/delete`, {
    data: { order_ids: order_ids },
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });
  return response.data;
};
export const deleteAllOrder = async (): Promise<void> => {
  const response = await alabaApi.delete(`/dashboard/orders/delete-all`, {
    // data: { order_ids: order_ids },
    // // headers: {
    // //   "Content-Type": "multipart/form-data",
    // // },
  });
  return response.data;
};

export const useDeleteOrder = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      showToast("Deleted Order(s) successfully!", "success");
      closeModal();
    },
    onError() {
      showToast("Unable to Delete...try again later", "error");
    },
  });
};
export const useDeleteAllOrder = () => {
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllOrder,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      showToast("Deleted Order(s) successfully!", "success");
      closeModal();
    },
    onError() {
      showToast("Unable to Delete...try again later", "error");
    },
  });
};
