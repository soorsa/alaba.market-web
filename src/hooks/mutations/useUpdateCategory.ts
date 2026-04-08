import { useMutation, useQueryClient } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import toast from "react-hot-toast";

interface Payload {
  formData: FormData;
  id: number;
}

export const updateCategory = async (payload: Payload): Promise<Product> => {
  const response = await alabaApi.put(
    `/categories/${payload.id}/`,
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Updated category successfully!");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
