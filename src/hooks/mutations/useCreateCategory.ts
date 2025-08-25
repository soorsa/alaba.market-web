import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";

interface Payload {
  formData: FormData;
}

export const createCategory = async (payload: Payload): Promise<Product> => {
  const response = await alabaApi.post(
    `/dashboard/category/create/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useCreateCategory = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      showToast("Created category successfully!", "success");
    },
    onError() {
      showToast("Unable to create...try again later", "error");
    },
  });
};
