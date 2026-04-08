import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

export const apply = async (): // payload: VendorApplicationPayload
Promise<User> => {
  const response = await alabaApi.post(
    `/vendor-applications/apply/`,
    // payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const accept = async (id: number) => {
  const response = await alabaApi.patch(`/vendor-applications/${id}/accept/`, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const reject = async (id: number) => {
  const response = await alabaApi.patch(`/vendor-applications/${id}/reject/`, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const useRejectVendorRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: reject,
    onSuccess() {
      qc.invalidateQueries({ queryKey: ["vendor-applications"] });
      toast.success("Vendor's application rejected");
    },
    onError() {
      toast.error("Failed to update... try again later");
    },
  });
};
export const useAcceptVendorRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: accept,
    onSuccess() {
      qc.invalidateQueries({ queryKey: ["vendor-applications"] });
      toast.success("Vendor's application accepted");
    },
    onError() {
      toast.error("Failed to update... try again later");
    },
  });
};
export const useBecomeVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apply,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor-applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      toast.success(
        "Request sent successfully... Please wait for review and approval!"
      );
    },
    onError(error: ErrorResponse) {
      if (error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Something went wrong...try again later");
      }
    },
  });
};
