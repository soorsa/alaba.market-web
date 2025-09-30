import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import { useUserStore, type User } from "../../zustand/useUserStore";
import type { VendorApplicationPayload } from "../../zustand/vendor-application.payload";
import alabaApi from "../ApiClient";

export const becomeVendor = async (
  payload: VendorApplicationPayload
): Promise<User> => {
  const user = useUserStore.getState().user;
  const response = await alabaApi.post(
    `/${user?.username}-become-a-vendors-application/`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useBecomeVendor = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: becomeVendor,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      showToast("Request sent successfully!", "success");
      showToast("Please wait for review and approval!", "info");
    },
    onError() {
      showToast("Something went wrong...try again later", "error");
    },
  });
};
