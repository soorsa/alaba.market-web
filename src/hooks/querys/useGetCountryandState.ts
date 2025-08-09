import { useQuery } from "@tanstack/react-query";
import alabaApi from "../ApiClient";

interface Country {
  id: number;
  name: string;
}

interface State {
  id: number;
  name: string;
  country: string;
}

export const useGetCountryandState = () => {
  // Fetch all countries
  const countriesQuery = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: () => alabaApi.get("/countries/").then((res) => res.data),
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
  });

  // Fetch states for selected country
  const statesQuery = useQuery<State[]>({
    queryKey: ["states"],
    queryFn: () => alabaApi.get("/states/").then((res) => res.data),
  });

  // const statesQuery = useQuery<State[]>({
  //   queryKey: ["states", selectedCountryId],
  //   queryFn: () =>
  //     alabaApi
  //       .get(`/states/by-country/${selectedCountryId}/`)
  //       .then((res) => res.data),
  //   enabled: !!selectedCountryId, // Only fetch when country is selected
  //   staleTime: 60 * 60 * 1000, // Cache for 1 hour
  // });

  return {
    countries: countriesQuery.data || [],
    states: statesQuery.data || [],
    isLoading: countriesQuery.isLoading || statesQuery.isLoading,
    isError: countriesQuery.isError || statesQuery.isError,
    refetchCountries: countriesQuery.refetch,
    refetchStates: statesQuery.refetch,
  };
};
