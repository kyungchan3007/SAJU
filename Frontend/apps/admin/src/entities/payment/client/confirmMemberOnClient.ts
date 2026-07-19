import { ADMIN_COMMUNITY_MEMBER_CONFIRM_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function confirmMemberOnClient(memberId: number): Promise<void> {
  const res = await fetch(ADMIN_COMMUNITY_MEMBER_CONFIRM_ENDPOINT_PATH(memberId), {
    method: "POST",
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? "참여 확정 실패");
  }
}

