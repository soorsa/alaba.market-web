import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserStore } from "../../zustand/useUserStore";
import alabaApi from "../ApiClient";

export const getUserShippingAddress = async (): Promise<ShippingResponse> => {
  const response = await alabaApi.get(`/shipping-address/`);
  return response.data;
};

// Query hook to get user Cart
export const useGetUserShipping = () => {
  const { token, setShippingAddress } = useUserStore.getState();
  const queryResult = useQuery<ShippingResponse, Error>({
    queryKey: ["shipping"],
    queryFn: () => getUserShippingAddress(),
    enabled: !!token,
  });
  useEffect(() => {
    if (queryResult.data) {
      setShippingAddress(queryResult.data);
    }
  }, [queryResult.data, setShippingAddress]);

  return queryResult;
};
