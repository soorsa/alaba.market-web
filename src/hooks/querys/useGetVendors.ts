import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { PaginatedResponse } from "../../types/PaginationTypes";

export interface Vendor {
  id: number;
  vendor_id: number | string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  user_passport: string;
  cac_upload: string;
  phone_number: string;
  nin: string;
  cac_number: string;
  business_name: string;
  business_email: string;
  office_address: string;
  bvn: string;
  bank_name: string;
  account_number: string;
  bank_account_name: string;
  active: boolean;
  date_joined: string; // or Date if you plan to parse it
  is_staff: boolean;
}
type VendorsResponse = PaginatedResponse<Vendor>;
export const getVendors = async (page: number): Promise<VendorsResponse> => {
  const response = await alabaApi.get(`/dashboard/users/vendors/?page=${page}`);
  return response.data;
};
// Query hook to get user Cart
export const useGetVendors = (page: number) => {
  return useQuery<VendorsResponse>({
    queryKey: ["vendors", page],
    queryFn: () => getVendors(page),
  });
};
