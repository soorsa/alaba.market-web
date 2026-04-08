import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";

type RequestsResponse = PaginatedResponse<VendorApplication>;
export const getVendorApplications = async (
  params: VendorApplicationFilterParams
): Promise<RequestsResponse> => {
  const response = await alabaApi.get(`/vendor-applications/`, { params });
  return response.data;
};
// Query hook to get user Cart
export const useGetVendorApplications = (
  params: VendorApplicationFilterParams
) => {
  return useQuery<RequestsResponse>({
    queryKey: ["vendor-applications", params],
    queryFn: () => getVendorApplications(params),
  });
};
