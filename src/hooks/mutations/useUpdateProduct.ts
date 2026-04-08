import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

export interface ProductPayload {
  id: string;
  formData: FormData;
}

export const updateProduct = async (
  payload: ProductPayload
): Promise<Product> => {
  const response = await alabaApi.put(
    `/products/${payload.id}/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      toast.success("Updated product successfully!");
    },
    onError() {
      toast.error("Unable to update...try again later");
    },
  });
};
