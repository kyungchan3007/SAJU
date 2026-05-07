"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchMyProfileOnClient } from "@/entities/user/client/fetchMyProfileOnClient";

export const MY_PROFILE_QUERY_KEY = ["my-profile"] as const;

export function useMyProfile() {
  return useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: fetchMyProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
