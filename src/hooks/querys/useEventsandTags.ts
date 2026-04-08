// hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
export const useGetEvents = () => {
  return useQuery<EventsResponse>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await alabaApi.get("/events/"); // Adjust endpoint
      return response.data;
    },
  });
};
export const useGetBrands = () => {
  return useQuery<PaginatedResponse<Brand>>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await alabaApi.get("/brands/"); // Adjust endpoint
      return response.data;
    },
  });
};
