import { ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    return ok(user);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
