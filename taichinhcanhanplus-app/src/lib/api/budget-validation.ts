import { BudgetPeriod } from "@/lib/types";

export const budgetPeriods: BudgetPeriod[] = ["weekly", "monthly", "quarterly", "yearly"];

export function validateBudgetPayload(body: Record<string, unknown>, partial = false) {
  if (!partial || body.name !== undefined) {
    if (typeof body.name !== "string" || !body.name.trim()) {
      return "Budget name is required.";
    }
  }

  if (!partial || body.amountLimit !== undefined) {
    if (typeof body.amountLimit !== "number" || body.amountLimit <= 0) {
      return "Budget amount limit must be greater than zero.";
    }
  }

  if (!partial || body.period !== undefined) {
    if (!budgetPeriods.includes(body.period as BudgetPeriod)) {
      return "Budget period is invalid.";
    }
  }

  if (!partial || body.startDate !== undefined || body.endDate !== undefined) {
    if (!body.startDate || !body.endDate) {
      return "Budget start date and end date are required.";
    }

    const startDate = new Date(String(body.startDate));
    const endDate = new Date(String(body.endDate));

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return "Budget date range is invalid.";
    }

    if (startDate >= endDate) {
      return "Budget end date must be after start date.";
    }
  }

  if (body.alertThresholdPercent !== undefined) {
    const threshold = Number(body.alertThresholdPercent);
    if (!Number.isFinite(threshold) || threshold < 1 || threshold > 100) {
      return "Budget alert threshold must be between 1 and 100.";
    }
  }

  return null;
}

export function normalizeOptionalId(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
