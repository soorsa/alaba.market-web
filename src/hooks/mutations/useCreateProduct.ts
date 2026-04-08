import { useMutation, useQueryClient } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import toast from "react-hot-toast";

export interface NewProductPayload {
  formData: FormData;
}

export const createProduct = async (
  payload: NewProductPayload
): Promise<Product> => {
  const response = await alabaApi.post(`/products/`, payload.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useCreateProduct = () => {
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
      toast.success("Created product successfully!");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
