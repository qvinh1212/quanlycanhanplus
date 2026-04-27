import { badRequest, created, ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { validateWalletPayload } from "@/lib/api/wallet-validation";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    const wallets = await firestoreFinanceDataAdapter.listWallets(user.id);
    return ok(wallets);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationError = validateWalletPayload(body);

    if (validationError) {
      return badRequest(validationError);
    }

    const user = await getAuthenticatedUser(request);
    const wallet = await firestoreFinanceDataAdapter.createWallet(user.id, {
      name: body.name.trim(),
      type: body.type,
      initialBalance: body.initialBalance,
      currency: body.currency,
      color: body.color,
      icon: body.icon,
    });

    return created(wallet);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
