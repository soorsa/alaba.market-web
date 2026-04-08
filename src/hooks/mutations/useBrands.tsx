import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

const createBrand = async (payload: BrandPayload) => {
  const formData = new FormData();
  if (payload.title) {
    formData.append("title", payload.title);
  }
  if (payload.thumbnail) {
    formData.append("thumbnail", payload.thumbnail);
  }
  if (payload.logo) {
    formData.append("logo", payload.logo);
  }
  if (payload.top_rated) {
    formData.append("top_rated", String(payload.top_rated));
  }
  const res = await alabaApi.post("/brands/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
      toast.success("Created Brand successfully");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
