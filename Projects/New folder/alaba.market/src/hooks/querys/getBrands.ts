// hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import type { Brand } from "../../types/ProductsTypes";
import alabaApi from "../ApiClient";

export const useFetchBrands = () => {
  return useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await alabaApi.get("/brands/"); // Adjust endpoint
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
