import { apiFetch } from "@/lib/api/client";
import type { UserProfile } from "@/lib/types";

export async function ensureCurrentUserWorkspace(user: Pick<UserProfile, "id" | "email" | "displayName">) {
  await apiFetch("/api/users/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}
