import { useMutation, useQueryClient } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import { useToastStore } from "../../zustand/ToastStore";
import type { Vendor } from "../querys/useGetVendors";
interface Data {
  id: number;
  payload: FormData;
}
export const reviewRequest = async (data: Data): Promise<Vendor> => {
  const response = await alabaApi.put(
    `/vendor-request/${data.id}/vendor-request-review/`,
    data.payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
// Query hook to get user Cart
export const useUpdateVendorStatus = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewRequest,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["vendor-request"],
      });
      showToast("Reviewed Vendor request successfully!", "success");
    },
    onError() {
      showToast("Sorry...try again later", "error");
    },
  });
};
