import { useQuery } from "@tanstack/react-query";
import { getLandingPageData } from "../api";
import type { LandingPageResponse } from "../../types/LandingPagetype";

// Query hook to get user Cart
export const useGetLandingPage = () => {
  return useQuery<LandingPageResponse>({
    queryKey: ["landing-page-data"],
    queryFn: getLandingPageData,
  });
};
