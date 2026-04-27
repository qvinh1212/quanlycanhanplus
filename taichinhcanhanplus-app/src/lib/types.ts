export type CurrencyCode = "VND" | "USD" | "EUR" | "JPY";

export type UserStatus = "active" | "disabled" | "pending";

export type WalletType =
  | "cash"
  | "bank"
  | "credit_card"
  | "e_wallet"
  | "investment"
  | "savings";

export type TransactionType = "income" | "expense" | "transfer";

export type TransactionStatus = "completed" | "pending" | "cancelled";

export type BudgetPeriod = "weekly" | "monthly" | "quarterly" | "yearly";

export type BudgetStatus = "active" | "paused" | "archived";

export type CategoryKind = "income" | "expense";

export interface AuditFields {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends AuditFields {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  defaultCurrency: CurrencyCode;
  locale: "vi-VN" | "en-US";
  timezone: string;
  status: UserStatus;
}

export interface Wallet extends AuditFields {
  id: string;
  userId: string;
  name: string;
  type: WalletType;
  currency: CurrencyCode;
  initialBalance: number;
  currentBalance: number;
  color: string;
  icon: string;
  isDefault: boolean;
  isArchived: boolean;
}

export interface Category extends AuditFields {
  id: string;
  userId: string;
  name: string;
  kind: CategoryKind;
  icon: string;
  color: string;
  parentId?: string;
  isSystem: boolean;
  isArchived: boolean;
}

export interface Transaction extends AuditFields {
  id: string;
  userId: string;
  walletId: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  currency: CurrencyCode;
  title: string;
  note?: string;
  occurredAt: Date;
  status: TransactionStatus;
  tags: string[];
  receiptUrl?: string;
  transferToWalletId?: string;
}

export interface Budget extends AuditFields {
  id: string;
  userId: string;
  name: string;
  categoryId?: string;
  walletId?: string;
  amountLimit: number;
  amountSpent: number;
  currency: CurrencyCode;
  period: BudgetPeriod;
  startDate: Date;
  endDate: Date;
  alertThresholdPercent: number;
  status: BudgetStatus;
}

export interface UserDashboardSummary {
  totalBalance: number;
  todayIncome: number;
  todayExpense: number;
  monthlyIncome: number;
  monthlyExpense: number;
  currency: CurrencyCode;
}
