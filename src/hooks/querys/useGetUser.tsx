import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";
import { useUserStore, type User } from "../../zustand/useUserStore";
import { useEffect } from "react";

export const getUser = async (username: string): Promise<User> => {
  const response = await alabaApi.get(`/users/${username}/`);
  return response.data;
};

// Query hook to get user Cart
export const useGetUser = () => {
  const { user, setUser } = useUserStore.getState();
  const username = user?.username || "";

  const queryResult = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => getUser(username),
  });

  useEffect(() => {
    if (queryResult.data) {
      setUser(queryResult.data);
    }
  }, [queryResult.data, setUser]);

  return queryResult;
};
