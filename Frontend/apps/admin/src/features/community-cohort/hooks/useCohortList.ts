import { useQuery } from "@tanstack/react-query";
import { fetchCommunityCohortsOnClient } from "@/entities/community/client/fetchCommunityCohortsOnClient";
import { COHORT_QUERY_KEY } from "@/features/community-cohort/model/queryKey";

export function useCohortList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: COHORT_QUERY_KEY,
    queryFn: fetchCommunityCohortsOnClient,
  });

  return { cohorts: data ?? [], isLoading, isError };
}
