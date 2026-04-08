import { useMutation, useQueryClient } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import toast from "react-hot-toast";

interface Payload {
  formData: FormData;
}

export const createCategory = async (payload: Payload): Promise<Product> => {
  const response = await alabaApi.post(`/categories/`, payload.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Created category successfully!");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
