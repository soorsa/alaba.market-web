import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";

interface Payload {
  formData: FormData;
  id: number;
}

export const updateCustomer = async (payload: Payload): Promise<Product> => {
  const response = await alabaApi.put(
    `/dashboard/users/customers/update/${payload.id}/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useUpdateCustomer = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      showToast("Updated Customer successfully!", "success");
    },
    onError() {
      showToast("Unable to create...try again later", "error");
    },
  });
};
