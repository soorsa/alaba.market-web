import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { PaginatedResponse } from "../../types/PaginationTypes";
import type { Vendor } from "./useGetVendors";

type RequestsResponse = PaginatedResponse<Vendor>;
export const getVendorRequest = async (
  page: number
): Promise<RequestsResponse> => {
  const response = await alabaApi.get(`/vendor-request/?page=${page}`);
  return response.data;
};
// Query hook to get user Cart
export const useGetVendorRequest = (page: number) => {
  return useQuery<RequestsResponse>({
    queryKey: ["vendor-request", page],
    queryFn: () => getVendorRequest(page),
  });
};
