import type {
  Budget,
  Category,
  Transaction,
  UserDashboardSummary,
  UserProfile,
  Wallet,
} from "@/lib/types";
import type {
  CreateBudgetInput,
  CreateTransactionInput,
  CreateWalletInput,
  UpdateBudgetInput,
  UpdateTransactionInput,
  UpdateWalletInput,
} from "@/lib/db/repository";
import type { ReportsAnalytics } from "@/lib/report-types";

export interface FinanceDataAdapter {
  getCurrentUser(): Promise<UserProfile>;

  getDashboardSummary(userId: string): Promise<UserDashboardSummary>;

  listWallets(userId: string): Promise<Wallet[]>;
  getWallet(userId: string, walletId: string): Promise<Wallet | null>;
  createWallet(userId: string, input: CreateWalletInput): Promise<Wallet>;
  updateWallet(userId: string, walletId: string, input: UpdateWalletInput): Promise<Wallet | null>;
  archiveWallet(userId: string, walletId: string): Promise<Wallet | null>;

  listCategories(userId: string): Promise<Category[]>;

  listTransactions(userId: string): Promise<Transaction[]>;
  getTransaction(userId: string, transactionId: string): Promise<Transaction | null>;
  createTransaction(userId: string, input: CreateTransactionInput): Promise<Transaction>;
  updateTransaction(
    userId: string,
    transactionId: string,
    input: UpdateTransactionInput,
  ): Promise<Transaction | null>;
  archiveTransaction(userId: string, transactionId: string): Promise<Transaction | null>;

  listBudgets(userId: string): Promise<Budget[]>;
  getBudget(userId: string, budgetId: string): Promise<Budget | null>;
  createBudget(userId: string, input: CreateBudgetInput): Promise<Budget>;
  updateBudget(userId: string, budgetId: string, input: UpdateBudgetInput): Promise<Budget | null>;
  archiveBudget(userId: string, budgetId: string): Promise<Budget | null>;

  getReportsAnalytics(userId: string): Promise<ReportsAnalytics>;
}

export const FIRESTORE_MIGRATION_TODO = [
  "Map Date fields to Firestore Timestamp on read/write.",
  "Scope every query by authenticated userId from Firebase Auth.",
  "Use write batches or transactions when wallet balances are materialized.",
  "Preserve repository return shapes so UI and API routes do not change.",
] as const;
