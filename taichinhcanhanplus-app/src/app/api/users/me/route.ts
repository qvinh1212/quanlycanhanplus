import { badRequest, ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    return ok(user);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const authenticatedUser = await getAuthenticatedUser(request);
    const body = await request.json();
    const displayName = typeof body.displayName === "string" && body.displayName.trim()
      ? body.displayName.trim()
      : authenticatedUser.displayName;

    if (typeof body.id === "string" && body.id !== authenticatedUser.id) {
      return badRequest("Không thể khởi tạo workspace cho người dùng khác.");
    }

    await firestoreFinanceDataAdapter.ensureUserProfile({
      id: authenticatedUser.id,
      email: authenticatedUser.email,
      displayName,
    });
    await firestoreFinanceDataAdapter.seedUserWorkspaceIfEmpty(authenticatedUser.id);

    return ok({ initialized: true });
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
