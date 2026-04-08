import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

export const updateProfile = async (payload: UserProfileUpdatePayload) => {
  const formData = new FormData();
  if (payload.first_name) {
    formData.append("first_name", payload.first_name);
  }
  if (payload.last_name) {
    formData.append("last_name", payload.last_name);
  }
  if (payload.phone_number) {
    formData.append("phone_number", payload.phone_number);
  }
  if (payload.profile_picture) {
    formData.append("profile_picture", payload.profile_picture);
  }
  if (payload.personal_address) {
    formData.append("personal_address", payload.personal_address);
  }
  if (payload.cac_number) {
    formData.append("cac_number", payload.cac_number);
  }
  if (payload.cac_upload) {
    formData.append("cac_upload", payload.cac_upload);
  }
  if (payload.user_passport) {
    formData.append("user_passport", payload.user_passport);
  }
  if (payload.business_email) {
    formData.append("business_email", payload.business_email);
  }
  if (payload.business_name) {
    formData.append("business_name", payload.business_name);
  }
  if (payload.bussiness_phone_number) {
    formData.append("bussiness_phone_number", payload.bussiness_phone_number);
  }
  if (payload.office_address) {
    formData.append("office_address", payload.office_address);
  }
  if (payload.bank_account_name) {
    formData.append("bank_account_name", payload.bank_account_name);
  }
  if (payload.bank_name) {
    formData.append("bank_name", payload.bank_name);
  }
  if (payload.account_number) {
    formData.append("account_number", payload.account_number);
  }
  if (payload.bvn) {
    formData.append("bvn", payload.bvn);
  }
  if (payload.nin) {
    formData.append("nin", payload.nin);
  }
  const res = await alabaApi.patch(`/profile/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("User profile updated");
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Failed to update user profile");
    },
  });
};
