import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { User } from "../../zustand/useUserStore";

export const getCustomers = async (page: number): Promise<User[]> => {
  const response = await alabaApi.get(`/users/?page=${page}`);
  return response.data;
};
// Query hook to get user Cart
export const useGetCustomers = (page: number) => {
  return useQuery<User[]>({
    queryKey: ["customers", page],
    queryFn: () => getCustomers(page),
  });
};
