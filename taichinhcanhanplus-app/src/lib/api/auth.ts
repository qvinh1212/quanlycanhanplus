import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim();
}

export async function getAuthenticatedUser(request: Request) {
  const token = getBearerToken(request);
  if (!token) {
    throw new Error("UNAUTHENTICATED");
  }

  const decodedToken = await getFirebaseAdminAuth().verifyIdToken(token);
  const userRecord = await getFirebaseAdminAuth().getUser(decodedToken.uid);
  const profile = await firestoreFinanceDataAdapter.ensureUserProfile({
    id: decodedToken.uid,
    email: userRecord.email ?? decodedToken.email ?? "",
    displayName: userRecord.displayName ?? decodedToken.name ?? decodedToken.email?.split("@").at(0) ?? "Người dùng",
  });

  await firestoreFinanceDataAdapter.seedUserWorkspaceIfEmpty(decodedToken.uid);
  return profile;
}

export function isAuthError(error: unknown) {
  return error instanceof Error && error.message === "UNAUTHENTICATED";
}
