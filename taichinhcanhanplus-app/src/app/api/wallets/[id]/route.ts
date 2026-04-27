import { badRequest, ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { validateWalletPayload } from "@/lib/api/wallet-validation";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";

interface WalletRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: WalletRouteContext) {
  try {
    const { id } = await context.params;
    const user = await getAuthenticatedUser(request);
    const wallet = await firestoreFinanceDataAdapter.getWallet(user.id, id);

    if (!wallet) return badRequest("Wallet not found.");
    return ok(wallet);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function PUT(request: Request, context: WalletRouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validationError = validateWalletPayload(body, true);

    if (validationError) return badRequest(validationError);

    const user = await getAuthenticatedUser(request);
    const wallet = await firestoreFinanceDataAdapter.updateWallet(user.id, id, {
      name: typeof body.name === "string" ? body.name.trim() : undefined,
      type: body.type,
      initialBalance: body.initialBalance,
      currency: body.currency,
      color: body.color,
      icon: body.icon,
    });

    if (!wallet) return badRequest("Wallet not found.");
    return ok(wallet);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function DELETE(request: Request, context: WalletRouteContext) {
  try {
    const { id } = await context.params;
    const user = await getAuthenticatedUser(request);
    const wallet = await firestoreFinanceDataAdapter.archiveWallet(user.id, id);

    if (!wallet) return badRequest("Wallet not found.");
    return ok(wallet);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
