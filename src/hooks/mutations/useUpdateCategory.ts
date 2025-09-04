import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";

interface Payload {
  formData: FormData;
  slug: string;
}

export const updateCategory = async (payload: Payload): Promise<Product> => {
  const response = await alabaApi.put(
    `/dashboard/category/${payload.slug}/update/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useUpdateCategory = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      showToast("Updated category successfully!", "success");
    },
    onError() {
      showToast("Unable to create...try again later", "error");
    },
  });
};
