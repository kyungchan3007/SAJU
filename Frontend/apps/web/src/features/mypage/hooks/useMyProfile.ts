"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchMyProfileOnClient } from "@/entities/user/client/fetchMyProfileOnClient";

export const MY_PROFILE_QUERY_KEY = ["my-profile"] as const;

export function useMyProfile() {
  const authScope = useAuthScope();
  return useQuery({
    queryKey: [...MY_PROFILE_QUERY_KEY, authScope],
    queryFn: fetchMyProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
