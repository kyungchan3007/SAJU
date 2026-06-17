import type {
  CommunityCohortCreateRequest,
  CommunityCohortCreateResponse,
} from "@/features/community-cohort/type/types";

export async function createCommunityCohortOnClient(
  body: CommunityCohortCreateRequest,
): Promise<CommunityCohortCreateResponse> {
  const res = await fetch("/api/admin/community/cohorts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as { success: boolean; data?: CommunityCohortCreateResponse; message?: string };

  if (!res.ok || !data.success) {
    throw new Error(data.message ?? "기수 등록 실패");
  }

  return data.data!;
}
