import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";

export interface NewProductPayload {
  formData: FormData;
}

export const createProduct = async (
  payload: NewProductPayload
): Promise<Product> => {
  const response = await alabaApi.post(
    `/dashboard/product/create/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useCreateProduct = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      showToast("Created product successfully!", "success");
    },
    onError() {
      showToast("Unable to create...try again later", "error");
    },
  });
};
