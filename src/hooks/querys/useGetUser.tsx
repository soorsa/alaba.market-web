import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserStore } from "../../zustand/useUserStore";
import alabaApi from "../ApiClient";

export const getUser = async (): Promise<User> => {
  const response = await alabaApi.get(`/profile/`);
  return response.data;
};
export const getUnifiedUser = async (username: string): Promise<User> => {
  const response = await alabaApi.get(`/unified-user/${username}/`);
  return response.data;
};
// Query hook to get user Cart
export const useGetUser = () => {
  const { setUser, token } = useUserStore.getState();

  const queryResult = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: !!token,
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
