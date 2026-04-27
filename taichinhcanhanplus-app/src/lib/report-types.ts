import type { Budget, Transaction } from "@/lib/types";

export interface CategoryReportItem {
  categoryId: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  transactionCount: number;
  percentage: number;
}

export interface DailyReportItem {
  date: string;
  income: number;
  expense: number;
  net: number;
}

export interface WalletReportItem {
  walletId: string;
  name: string;
  icon: string;
  color: string;
  balance: number;
  percentage: number;
}

export interface BudgetRiskItem {
  id: string;
  name: string;
  amountLimit: number;
  amountSpent: number;
  percentage: number;
  status: Budget["status"];
}

export interface ReportsAnalytics {
  periodLabel: string;
  totalIncome: number;
  totalExpense: number;
  netCashflow: number;
  savingRate: number;
  averageDailyExpense: number;
  largestExpense: Transaction | null;
  topExpenseCategories: CategoryReportItem[];
  dailyCashflow: DailyReportItem[];
  walletDistribution: WalletReportItem[];
  budgetRisks: BudgetRiskItem[];
  insight: string;
}
