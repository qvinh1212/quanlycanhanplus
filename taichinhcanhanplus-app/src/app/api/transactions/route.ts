import { badRequest, created, ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { normalizeOptionalId, validateTransactionPayload } from "@/lib/api/transaction-validation";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    const transactions = await firestoreFinanceDataAdapter.listTransactions(user.id);
    return ok(transactions);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationError = validateTransactionPayload(body);

    if (validationError) {
      return badRequest(validationError);
    }

    const user = await getAuthenticatedUser(request);
    const transaction = await firestoreFinanceDataAdapter.createTransaction(user.id, {
      walletId: body.walletId,
      categoryId: normalizeOptionalId(body.categoryId),
      type: body.type,
      amount: body.amount,
      title: body.title.trim(),
      note: body.note,
      occurredAt: body.occurredAt ? new Date(body.occurredAt) : undefined,
      tags: Array.isArray(body.tags) ? body.tags : [],
    });

    return created(transaction);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
