import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import type { Product } from "../../types/ProductsTypes";

export const getProductByID = async (product_id: string): Promise<Product> => {
  const response = await alabaApi.get(`/product/${product_id}`);
  return response.data;
};

// Query hook to get user Cart
export const useGetProductByID = (product_id: string) => {
  return useQuery<Product>({
    queryKey: ["product", product_id],
    queryFn: () => getProductByID(product_id),
    enabled: !!product_id,
  });
};
