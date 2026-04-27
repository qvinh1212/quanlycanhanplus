import { badRequest, created, ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { normalizeOptionalId, validateBudgetPayload } from "@/lib/api/budget-validation";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);
    const budgets = await firestoreFinanceDataAdapter.listBudgets(user.id);
    return ok(budgets);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationError = validateBudgetPayload(body);

    if (validationError) {
      return badRequest(validationError);
    }

    const user = await getAuthenticatedUser(request);
    const budget = await firestoreFinanceDataAdapter.createBudget(user.id, {
      name: body.name.trim(),
      categoryId: normalizeOptionalId(body.categoryId),
      walletId: normalizeOptionalId(body.walletId),
      amountLimit: Number(body.amountLimit),
      period: body.period,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      alertThresholdPercent: Number(body.alertThresholdPercent ?? 80),
    });

    return created(budget);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
