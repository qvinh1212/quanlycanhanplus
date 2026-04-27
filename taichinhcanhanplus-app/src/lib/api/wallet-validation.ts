import { WalletType } from "@/lib/types";

export const walletTypes: WalletType[] = [
  "cash",
  "bank",
  "credit_card",
  "e_wallet",
  "investment",
  "savings",
];

export function validateWalletPayload(body: Record<string, unknown>, partial = false) {
  if (!partial || body.name !== undefined) {
    if (!body.name || typeof body.name !== "string") return "Wallet name is required.";
  }

  if (!partial || body.type !== undefined) {
    if (!walletTypes.includes(body.type as WalletType)) return "Wallet type is invalid.";
  }

  if (!partial || body.initialBalance !== undefined) {
    if (typeof body.initialBalance !== "number") return "Initial balance must be a number.";
  }

  if (body.currency !== undefined && body.currency !== "VND") {
    return "Only VND is supported in this demo.";
  }

  return null;
}
