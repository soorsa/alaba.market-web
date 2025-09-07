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
// Query hook to get user Cart
export const useGetCustomers = (page: number) => {
  return useQuery<CustomersResponse>({
    queryKey: ["customers", page],
    queryFn: () => getCustomers(page),
  });
};
