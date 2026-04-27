import { badRequest, ok, serverError, unauthorized } from "@/lib/api/response";
import { getAuthenticatedUser, isAuthError } from "@/lib/api/auth";
import { normalizeOptionalId, validateBudgetPayload } from "@/lib/api/budget-validation";
import { firestoreFinanceDataAdapter } from "@/lib/db/firestore-adapter";
import { BudgetStatus } from "@/lib/types";

const budgetStatuses: BudgetStatus[] = ["active", "paused", "archived"];

interface BudgetRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: BudgetRouteContext) {
  try {
    const { id } = await context.params;
    const user = await getAuthenticatedUser(request);
    const budget = await firestoreFinanceDataAdapter.getBudget(user.id, id);

    if (!budget) {
      return badRequest("Budget not found.");
    }

    return ok(budget);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function PUT(request: Request, context: BudgetRouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validationError = validateBudgetPayload(body, true);

    if (validationError) {
      return badRequest(validationError);
    }

    if (body.status !== undefined && !budgetStatuses.includes(body.status)) {
      return badRequest("Budget status is invalid.");
    }

    const user = await getAuthenticatedUser(request);
    const budget = await firestoreFinanceDataAdapter.updateBudget(user.id, id, {
      name: typeof body.name === "string" ? body.name.trim() : undefined,
      categoryId: normalizeOptionalId(body.categoryId),
      walletId: normalizeOptionalId(body.walletId),
      amountLimit: body.amountLimit === undefined ? undefined : Number(body.amountLimit),
      period: body.period,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      alertThresholdPercent:
        body.alertThresholdPercent === undefined ? undefined : Number(body.alertThresholdPercent),
      status: body.status,
    });

    if (!budget) {
      return badRequest("Budget not found.");
    }

    return ok(budget);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}

export async function DELETE(request: Request, context: BudgetRouteContext) {
  try {
    const { id } = await context.params;
    const user = await getAuthenticatedUser(request);
    const budget = await firestoreFinanceDataAdapter.archiveBudget(user.id, id);

    if (!budget) {
      return badRequest("Budget not found.");
    }

    return ok(budget);
  } catch (error) {
    if (isAuthError(error)) return unauthorized();
    return serverError(error);
  }
}
