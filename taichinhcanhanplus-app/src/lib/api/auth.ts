import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import type { UserProfile } from "@/lib/types";

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim();
}

export async function getAuthenticatedUser(request: Request): Promise<UserProfile> {
  const token = getBearerToken(request);
  if (!token) {
    throw new Error("UNAUTHENTICATED");
  }

  const decodedToken = await getFirebaseAdminAuth().verifyIdToken(token);
  const userRecord = await getFirebaseAdminAuth().getUser(decodedToken.uid);

  return {
    id: decodedToken.uid,
    email: userRecord.email ?? decodedToken.email ?? "",
    displayName: userRecord.displayName ?? decodedToken.name ?? decodedToken.email?.split("@").at(0) ?? "Người dùng",
    defaultCurrency: "VND",
    locale: "vi-VN",
    timezone: "Asia/Ho_Chi_Minh",
    status: userRecord.disabled ? "disabled" : "active",
    createdAt: userRecord.metadata.creationTime ? new Date(userRecord.metadata.creationTime) : new Date(),
    updatedAt: new Date(),
  };
}

export function isAuthError(error: unknown) {
  return error instanceof Error && error.message === "UNAUTHENTICATED";
}
