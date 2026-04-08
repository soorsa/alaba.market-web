import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";

export const useGetCountryandState = () => {
  // Fetch all countries
  interface Response<T> {
    results: T;
  }
  const fetchCountries = async (): Promise<Response<Country[]>> => {
    const res = await alabaApi.get("/country/");
    return res.data;
  };
  const fetchState = async (): Promise<Response<State[]>> => {
    const res = await alabaApi.get("/state/");
    return res.data;
  };
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchCountries(),
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
  });

  // Fetch states for selected country
  const statesQuery = useQuery({
    queryKey: ["states"],
    queryFn: () => fetchState(),
  });

  return {
    countries: countriesQuery.data?.results || [],
    states: statesQuery.data?.results || [],
    isLoading: countriesQuery.isLoading || statesQuery.isLoading,
    isError: countriesQuery.isError || statesQuery.isError,
    refetchCountries: countriesQuery.refetch,
    refetchStates: statesQuery.refetch,
  };
};
