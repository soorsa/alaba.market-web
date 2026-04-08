// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../api";
import alabaApi from "../ApiClient";

export const useFilterProducts = (filters: ProductFilters = {}) => {
  return useQuery<ProductListResponse>({
    queryKey: ["products", filters],
    queryFn: () => getFilteredProducts(filters),
    // keepPreviousData: true,
  });
};

const getProducts = async (
  params: ProductFilters
): Promise<ProductListResponse> => {
  const response = await alabaApi.get(`/products/`, { params });
  return response.data;
};

export const useGetProducts = (params: ProductFilters) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};
