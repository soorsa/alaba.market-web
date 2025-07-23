// hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import type { Category } from "../../types/ProductsTypes";
import alabaApi from "../ApiClient";

export const useFetchCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await alabaApi.get("/categories/"); // Adjust endpoint
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
