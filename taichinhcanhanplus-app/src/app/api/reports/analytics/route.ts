import { ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    const analytics = await firestoreFinanceDataAdapter.getReportsAnalytics(user.id);
    return ok(analytics);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
