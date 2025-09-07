import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { User } from "../../zustand/useUserStore";
import type { PaginatedResponse } from "../../types/PaginationTypes";

type VendorsResponse = PaginatedResponse<User>;
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
