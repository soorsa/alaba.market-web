// hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
export interface Events {
  id: number;
  slug: string;
  title: string;
  banner: string;
  is_banner: boolean;
}
export const useGetEvents = () => {
  return useQuery<Events[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await alabaApi.get("/dashboard/events/"); // Adjust endpoint
      return response.data;
    },
  });
};
