import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";

type CustomersResponse = PaginatedResponse<User>;
export const getUsersByRole = async (
  params: usersFiltersParams
): Promise<CustomersResponse> => {
  const response = await alabaApi.get(`/users/`, { params });
  return response.data;
};
export const useGetUsersByRole = (params: usersFiltersParams) => {
  return useQuery<CustomersResponse>({
    queryKey: ["users", params],
    queryFn: () => getUsersByRole(params),
  });
};
