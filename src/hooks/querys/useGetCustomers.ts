import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { User } from "../../zustand/useUserStore";
import type { PaginatedResponse } from "../../types/PaginationTypes";

type CustomersResponse = PaginatedResponse<User>;
export const getCustomers = async (
  page: number
): Promise<CustomersResponse> => {
  const response = await alabaApi.get(
    `/dashboard/users/customers/?page=${page}`
  );
  return response.data;
};
export const getSatffs = async (page: number): Promise<CustomersResponse> => {
  const response = await alabaApi.get(`/dashboard/users/staffs/?page=${page}`);
  return response.data;
};
export const getVendors = async (page: number): Promise<CustomersResponse> => {
  const response = await alabaApi.get(`/dashboard/users/vendors/?page=${page}`);
  return response.data;
};
// Query hook to get user Cart
export const useGetCustomers = (page: number) => {
  return useQuery<CustomersResponse>({
    queryKey: ["customers", page],
    queryFn: () => getCustomers(page),
  });
};
export const useGetStaff = (page: number) => {
  return useQuery<CustomersResponse>({
    queryKey: ["staffs", page],
    queryFn: () => getSatffs(page),
  });
};
export const useGetVendors = (page: number) => {
  return useQuery<CustomersResponse>({
    queryKey: ["vendors", page],
    queryFn: () => getVendors(page),
  });
};
