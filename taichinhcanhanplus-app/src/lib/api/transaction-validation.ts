import { TransactionStatus, TransactionType } from "@/lib/types";

export const transactionTypes: TransactionType[] = ["income", "expense", "transfer"];
export const transactionStatuses: TransactionStatus[] = ["completed", "pending", "cancelled"];

export function normalizeOptionalId(value: unknown) {
  if (value === undefined) return undefined;
  if (value === null || value === "") return "";
  return typeof value === "string" ? value : undefined;
}

export function validateTransactionPayload(body: Record<string, unknown>, partial = false) {
  if (!partial || body.walletId !== undefined) {
    if (!body.walletId || typeof body.walletId !== "string") return "Wallet id is required.";
  }

  if (!partial || body.type !== undefined) {
    if (!transactionTypes.includes(body.type as TransactionType)) return "Transaction type is invalid.";
  }

  if (!partial || body.amount !== undefined) {
    if (typeof body.amount !== "number" || body.amount <= 0) return "Amount must be greater than zero.";
  }

  if (!partial || body.title !== undefined) {
    if (!body.title || typeof body.title !== "string") return "Transaction title is required.";
  }

  if (body.status !== undefined && !transactionStatuses.includes(body.status as TransactionStatus)) {
    return "Transaction status is invalid.";
  }

  return null;
}
