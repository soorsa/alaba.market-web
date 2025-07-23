// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../api";
import type { ProductListResponse } from "../../types/ProductsTypes";

type ProductFilters = {
  min_price?: number;
  max_price?: number;
  category?: string;
  brand?: string;
  tag?: string;
  vendor?: string;
  featured?: boolean;
  promote?: boolean;
  approved?: boolean;
  search?: string;
  order_by?: string;
  page?: number;
};

export const useFilterProducts = (filters: ProductFilters = {}) => {
  return useQuery<ProductListResponse>({
    queryKey: ["products", filters],
    queryFn: () => getFilteredProducts(filters),
    // keepPreviousData: true,
  });
};
