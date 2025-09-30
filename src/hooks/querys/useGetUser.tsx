import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import { useUserStore, type User } from "../../zustand/useUserStore";
import { useEffect } from "react";

export const getUser = async (username: string): Promise<User> => {
  const response = await alabaApi.get(`/user/${username}/`);
  return response.data;
};
export const getUnifiedUser = async (username: string): Promise<User> => {
  const response = await alabaApi.get(`/unified-user/${username}/`);
  return response.data;
};

// Query hook to get user Cart
export const useGetUser = () => {
  const { user, setUser } = useUserStore.getState();
  const username = user?.username || "";

  const queryResult = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => getUser(username),
    enabled: !!username,
  });

  useEffect(() => {
    if (queryResult.data) {
      setUser(queryResult.data);
    }
  }, [queryResult.data, setUser]);

  return queryResult;
};
export const useGetUnifiedUser = () => {
  const { user, setUser } = useUserStore.getState();
  const username = user?.username || "";

  const queryResult = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => getUnifiedUser(username),
    enabled: !!username,
  });

  useEffect(() => {
    if (queryResult.data) {
      setUser(queryResult.data);
    }
  }, [queryResult.data, setUser]);

  return queryResult;
};
