import { badRequest, ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { normalizeOptionalId, validateTransactionPayload } from "@/lib/api/transaction-validation";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";

interface TransactionRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: TransactionRouteContext) {
  try {
    const { id } = await context.params;
    const user = await getAuthenticatedUser(request);
    const transaction = await firestoreFinanceDataAdapter.getTransaction(user.id, id);

    if (!transaction) return badRequest("Transaction not found.");
    return ok(transaction);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function PUT(request: Request, context: TransactionRouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validationError = validateTransactionPayload(body, true);

    if (validationError) return badRequest(validationError);

    const user = await getAuthenticatedUser(request);
    const transaction = await firestoreFinanceDataAdapter.updateTransaction(user.id, id, {
      walletId: body.walletId,
      categoryId: normalizeOptionalId(body.categoryId),
      type: body.type,
      amount: body.amount,
      title: typeof body.title === "string" ? body.title.trim() : undefined,
      note: body.note,
      occurredAt: body.occurredAt ? new Date(body.occurredAt) : undefined,
      tags: Array.isArray(body.tags) ? body.tags : undefined,
      status: body.status,
    });

    if (!transaction) return badRequest("Transaction not found.");
    return ok(transaction);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function DELETE(request: Request, context: TransactionRouteContext) {
  try {
    const { id } = await context.params;
    const user = await getAuthenticatedUser(request);
    const transaction = await firestoreFinanceDataAdapter.archiveTransaction(user.id, id);

    if (!transaction) return badRequest("Transaction not found.");
    return ok(transaction);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
